// program-schedule-page.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import {
  filter,
  finalize,
  forkJoin,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

import {
  DayService,
  LoaderService,
  ProgramService,
  PeriodsService,
  FacultyUserService,         // ✅ جديد
} from '@project-manara-frontend/services';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { DayResponse } from '@project-manara-frontend/models';

import {
  SubjectItem,
  ScheduleEntry,
  SlotCell,
  SchedulePageData,
  PeriodItem,
  StaffMember,
  SlotDialogData,
  SlotDialogResult,
} from '@project-manara-frontend/view-models';
import {
  ScheduleItemResponse,
  ProgramScheduleRequest,
  ScheduleItemRequest,
} from '@project-manara-frontend/models';
import { GridCell } from '@project-manara-frontend/view-models';
import { DragDropGridService } from '@project-manara-frontend/services';
import { SlotDetailDialogComponent } from '../../components/slot-detail-dialog/slot-detail-dialog.component';

const SCHEDULE_POOL_ID = 'schedule-subjects-pool';

@Component({
  selector: 'app-program-schedule-page',
  templateUrl: './program-schedule-page.component.html',
  styleUrls: ['./program-schedule-page.component.css'],
  standalone: false,
})
export class ProgramSchedulePageComponent implements OnInit, OnDestroy {
  // ─── IDs ───────────────────────────────────────────────
  programId!: number;
  facultyId!: number;
  readonly poolId = SCHEDULE_POOL_ID;

  // ─── Cleanup ───────────────────────────────────────────
  private readonly destroy$ = new Subject<void>();

  // ─── Streams ───────────────────────────────────────────
  data$!: Observable<SchedulePageData>;

  // ─── Pool ──────────────────────────────────────────────
  private allPoolEntries: ScheduleEntry[] = [];
  filteredPoolEntries: ScheduleEntry[] = [];
  private searchQuery = '';

  // ─── Staff Data ────────────────────────────────────────
  doctors: StaffMember[] = [];
  instructors: StaffMember[] = [];

  // ─── Lookup Maps ───────────────────────────────────────
  private dayIndexMap = new Map<number, number>();
  private periodIndexMap = new Map<number, number>();

  // ─── Saved Schedule ────────────────────────────────────
  private savedScheduleItems: ScheduleItemResponse[] = [];

  // ─── DragDrop Service ──────────────────────────────────
  readonly dnd = new DragDropGridService<ScheduleEntry>();

  get slotGrid(): SlotCell[][] {
    return this.dnd.grid as unknown as SlotCell[][];
  }

  get canUndo(): boolean {
    return this.dnd.canUndo;
  }

  // ─── Constructor ───────────────────────────────────────

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly programService: ProgramService,
    private readonly periodsService: PeriodsService,
    private readonly dayService: DayService,
    private readonly loaderService: LoaderService,
    private readonly dialog: MatDialog,
    private readonly facultyUserService: FacultyUserService,  // ✅ جديد
  ) {}

  // ─── Init ──────────────────────────────────────────────

  ngOnInit(): void {
    this.programId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.loaderService.loading();

    this.dnd.configure({
      sourcePoolId: SCHEDULE_POOL_ID,
      canDropItem: (item, targetCell) =>
        !targetCell.items.some((e) => e.subjectId === item.subjectId),
      transformOnAdd: (source, newUid) => ({ ...source, uid: newUid }),
    });

    this.data$ = this.buildDataStream();
    // ✅ شيلنا loadStaff() — بقت جوه الـ forkJoin
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── Data Stream ───────────────────────────────────────
  // ✅ ضفنا doctors و instructors في الـ forkJoin

  private buildDataStream(): Observable<SchedulePageData> {
    // ✅ Default filters للـ staff (جيب كل الناس)
    const staffFilters = {
      PageNumber: 1,
      PageSize: 1000,    // عدد كبير عشان نجيب كلهم
      SearchValue: '',
      SortColumn: '',
      SortDirection: '',
    };

    return this.store.select(selectFacultyId).pipe(
      filter((id): id is number => !!id),
      take(1),
      tap((id) => (this.facultyId = id)),
      switchMap((facultyId) =>
        forkJoin({
          days: this.dayService.getAll(),
          subjects: this.programService.getSubjects(this.programId),
          periods: this.periodsService.getAll(facultyId, false),
          savedSchedule: this.programService.getSchedule(this.programId),
          doctors: this.facultyUserService.getFacultyDoctors(           // ✅ جديد
            facultyId,
            staffFilters,
          ),
          instructors: this.facultyUserService.getFacultyInstructors(   // ✅ جديد
            facultyId,
            staffFilters,
          ),
        }).pipe(finalize(() => this.loaderService.hide())),
      ),
      map(({ days, subjects, periods, savedSchedule, doctors, instructors }) => {
        this.savedScheduleItems = savedSchedule.schedules ?? [];

        // ✅ Map الـ API response لـ StaffMember
        this.doctors = doctors.items.map(
          (d): StaffMember => ({
            id: d.id,
            name: d.name,
          }),
        );

        this.instructors = instructors.items.map(
          (i): StaffMember => ({
            id: i.id,
            name: i.name,
          }),
        );

        return {
          days,
          subjects: subjects
            .filter((s) => !s.isDeleted)
            .map(
              (s): SubjectItem => ({
                id: s.id,
                name: s.name,
                code: s.code,
                creditHours: s.creditHours,
              }),
            ),
          periods: periods
            .filter((p) => !p.isDeleted)
            .map(
              (p): PeriodItem => ({
                id: p.id,
                label: `${this.formatTime(p.startTime)} - ${this.formatTime(p.endTime)}`,
                startTime: p.startTime,
                endTime: p.endTime,
              }),
            )
            .sort((a, b) => a.label.localeCompare(b.label)),
        };
      }),
      tap(({ days, subjects, periods }) => {
        this.buildLookupMaps(days, periods);
        this.buildPool(subjects);
        this.buildGrid(days, periods);
        this.loadSavedEntries(subjects);
      }),
    );
  }

  // ─── Lookup Maps ───────────────────────────────────────

  private buildLookupMaps(days: DayResponse[], periods: PeriodItem[]): void {
    this.dayIndexMap.clear();
    this.periodIndexMap.clear();

    days.forEach((day, index) => this.dayIndexMap.set(day.id, index));
    periods.forEach((period, index) => this.periodIndexMap.set(period.id, index));
  }

  // ─── Load Saved Entries into Grid ──────────────────────

  private loadSavedEntries(subjects: SubjectItem[]): void {
    const subjectMap = new Map<number, SubjectItem>();
    subjects.forEach((s) => subjectMap.set(s.id, s));

    for (const item of this.savedScheduleItems) {
      const subject = subjectMap.get(item.subjectId);
      if (!subject) continue;

      const dayIndex = this.dayIndexMap.get(item.dayId);
      const periodIndex = this.periodIndexMap.get(item.periodId);

      if (dayIndex === undefined || periodIndex === undefined) continue;

      const cell = this.slotGrid[dayIndex]?.[periodIndex];
      if (!cell) continue;

      const alreadyExists = cell.items.some(
        (e) => e.subjectId === subject.id,
      );
      if (alreadyExists) continue;

      const entry: ScheduleEntry = {
        uid: this.dnd.generateUid(),
        subjectId: subject.id,
        name: subject.name,
        code: subject.code,
        creditHours: subject.creditHours,
        doctorId: item.doctorId ?? null,
        doctorName: item.doctorName ?? null,
        instructorId: item.instructorId ?? null,
        instructorName: item.instructorName ?? null,
      };

      cell.items.push(entry);
    }
  }

  // ─── Pool ──────────────────────────────────────────────

  private buildPool(subjects: SubjectItem[]): void {
    this.allPoolEntries = subjects.map((s) => ({
      uid: `pool_${s.id}`,
      subjectId: s.id,
      name: s.name,
      code: s.code,
      creditHours: s.creditHours,
    }));
    this.applySearch();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applySearch();
  }

  private applySearch(): void {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredPoolEntries = q
      ? this.allPoolEntries.filter(
          (e) =>
            e.name.toLowerCase().includes(q) ||
            e.code.toLowerCase().includes(q),
        )
      : [...this.allPoolEntries];
  }

  // ─── Grid ──────────────────────────────────────────────

  private buildGrid(days: DayResponse[], periods: PeriodItem[]): void {
    this.dnd.initGrid(days.length, periods.length, (row, col) => ({
      day: days[row],
      time: periods[col].label,
      periodId: periods[col].id,
    }));
  }

  // ─── Drop Events ──────────────────────────────────────

  onDropToCell(payload: {
    event: CdkDragDrop<ScheduleEntry[]>;
    dayIndex: number;
    timeIndex: number;
  }): void {
    this.dnd.onDropToCell(payload.event, payload.dayIndex, payload.timeIndex);
  }

  onDropBackToPool(event: CdkDragDrop<ScheduleEntry[]>): void {
    this.dnd.onDropBackToPool(event);
  }

  onDragEnterCell(payload: { dayIndex: number; timeIndex: number }): void {
    this.dnd.onDragEnterCell(payload.dayIndex, payload.timeIndex);
  }

  onDragLeaveCell(payload: { dayIndex: number; timeIndex: number }): void {
    this.dnd.onDragLeaveCell(payload.dayIndex, payload.timeIndex);
  }

  getDropPredicate = (
    di: number,
    ti: number,
  ): ((drag: CdkDrag, drop: CdkDropList) => boolean) => {
    return this.dnd.getDropPredicate(di, ti);
  };

  // ─── Slot Click → Open Dialog ──────────────────────────

  onSlotClicked(payload: {
    entry: ScheduleEntry;
    dayIndex: number;
    timeIndex: number;
  }): void {
    const { entry, dayIndex, timeIndex } = payload;
    const cell = this.slotGrid[dayIndex][timeIndex];

    const dialogData: SlotDialogData = {
      entry,
      day: cell.day,
      time: cell.time,
      doctors: this.doctors,
      instructors: this.instructors,
      selectedDoctorId: entry.doctorId ?? null,
      selectedInstructorId: entry.instructorId ?? null,
    };

    const dialogRef = this.dialog.open(SlotDetailDialogComponent, {
      data: dialogData,
      width: '480px',
      panelClass: 'slot-dialog-panel',
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: SlotDialogResult | undefined) => {
        if (!result) return;
        this.applyAssignment(entry, result);
      });
  }

  private applyAssignment(
    entry: ScheduleEntry,
    result: SlotDialogResult,
  ): void {
    const location = this.dnd.findItemInGrid(entry.uid);
    if (!location) return;

    const cell = this.slotGrid[location.rowIndex][location.colIndex];
    const item = cell.items[location.itemIndex];

    // Update doctor assignment
    item.doctorId = result.doctorId;
    item.doctorName =
      this.doctors.find((d) => d.id === result.doctorId)?.name ?? null;

    // Update instructor assignment
    item.instructorId = result.instructorId;
    item.instructorName =
      this.instructors.find((a) => a.id === result.instructorId)?.name ?? null;

    // Reassign items array to trigger *ngFor and class binding updates
    cell.items = [...cell.items];
  }

  // ─── Actions ───────────────────────────────────────────

  undoLastAction(): void {
    this.dnd.undo();
  }

  resetSchedule(): void {
    this.dnd.reset();
  }

  saveSchedule(): void {
    const schedules: ScheduleItemRequest[] = [];

    for (let dayIdx = 0; dayIdx < this.slotGrid.length; dayIdx++) {
      for (
        let periodIdx = 0;
        periodIdx < this.slotGrid[dayIdx].length;
        periodIdx++
      ) {
        const cell = this.slotGrid[dayIdx][periodIdx];

        for (const item of cell.items) {
          schedules.push({
            subjectId: item.subjectId,
            periodId: cell.periodId,
            dayId: cell.day.id,
            doctorId: item.doctorId ?? null,
            instructorId: item.instructorId ?? null,
          });
        }
      }
    }

    const request: ProgramScheduleRequest = { schedules };

    this.loaderService.loading();

    this.programService
      .saveSchedule(this.programId, request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loaderService.hide()),
      )
      .subscribe({
        next: () => {
          console.log('Schedule saved successfully!', request);
        },
        error: (err) => {
          console.error('Failed to save schedule', err);
        },
      });
  }

  // ─── Helpers ───────────────────────────────────────────

  private formatTime(time: string): string {
    if (!time) return '';
    const [h, m] = time.split(':');
    return `${h}:${m}`;
  }
}