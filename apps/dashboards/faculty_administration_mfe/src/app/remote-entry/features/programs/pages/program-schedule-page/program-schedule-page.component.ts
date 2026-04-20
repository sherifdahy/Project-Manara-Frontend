import { Component, OnInit } from '@angular/core';
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
  switchMap,
  take,
  tap,
} from 'rxjs';

import {
  DayService,
  LoaderService,
  ProgramService,
  PeriodsService,
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
export class ProgramSchedulePageComponent implements OnInit {
  // ─── IDs ───────────────────────────────────────────────
  programId!: number;
  facultyId!: number;
  readonly poolId = SCHEDULE_POOL_ID;

  // ─── Streams ───────────────────────────────────────────
  data$!: Observable<SchedulePageData>;

  // ─── Pool ──────────────────────────────────────────────
  private allPoolEntries: ScheduleEntry[] = [];
  filteredPoolEntries: ScheduleEntry[] = [];
  private searchQuery = '';

  // ─── Staff Data ────────────────────────────────────────
  doctors: StaffMember[] = [];
  assistants: StaffMember[] = [];

  // ─── Lookup Maps ───────────────────────────────────────
  private dayIndexMap = new Map<number, number>();   // dayId → rowIndex
  private periodIndexMap = new Map<number, number>(); // periodId → colIndex

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
    this.loadStaff();
  }

  // ─── Load Staff ────────────────────────────────────────

  private loadStaff(): void {
    // TODO: استبدل بالـ API الحقيقي
    this.doctors = [
      { id: 1, name: 'Dr. Ahmed Hassan' },
      { id: 2, name: 'Dr. Mohamed Ali' },
      { id: 3, name: 'Dr. Sara Ibrahim' },
      { id: 4, name: 'Dr. Fatma Khalil' },
    ];

    this.assistants = [
      { id: 1, name: 'Eng. Omar Youssef' },
      { id: 2, name: 'Eng. Nour Adel' },
      { id: 3, name: 'Eng. Khaled Mostafa' },
    ];
  }

  // ─── Data Stream ───────────────────────────────────────

  private buildDataStream(): Observable<SchedulePageData> {
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
        }).pipe(finalize(() => this.loaderService.hide())),
      ),
      map(({ days, subjects, periods, savedSchedule }) => {
        // حفظ الـ saved schedule items
        this.savedScheduleItems = savedSchedule.schedules ?? [];

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
      const subject = item.subject;
      if (!subject || subject.isDeleted) continue;

      const dayIndex = this.dayIndexMap.get(item.dayId);
      const periodIndex = this.periodIndexMap.get(item.periodId);

      if (dayIndex === undefined || periodIndex === undefined) continue;

      const cell = this.slotGrid[dayIndex]?.[periodIndex];
      if (!cell) continue;

      // تأكد إن المادة مش موجودة في نفس الـ cell
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
      assistants: this.assistants,
      selectedDoctorId: entry.doctorId ?? null,
      selectedAssistantId: entry.assistantId ?? null,
    };

    const dialogRef = this.dialog.open(SlotDetailDialogComponent, {
      data: dialogData,
      width: '480px',
      panelClass: 'slot-dialog-panel',
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
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

    item.doctorId = result.doctorId;
    item.doctorName =
      this.doctors.find((d) => d.id === result.doctorId)?.name ?? null;

    item.assistantId = result.assistantId;
    item.assistantName =
      this.assistants.find((a) => a.id === result.assistantId)?.name ?? null;
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

    // لف على كل cell في الـ grid
    for (let dayIdx = 0; dayIdx < this.slotGrid.length; dayIdx++) {
      for (let periodIdx = 0; periodIdx < this.slotGrid[dayIdx].length; periodIdx++) {
        const cell = this.slotGrid[dayIdx][periodIdx];

        for (const item of cell.items) {
          schedules.push({
            subjectId: item.subjectId,
            periodId: cell.periodId,
            dayId: cell.day.id,
          });
        }
      }
    }

    const request: ProgramScheduleRequest = { schedules };

    this.loaderService.loading();

    this.programService
      .saveSchedule(this.programId, request)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: () => {
          console.log('Schedule saved successfully!', request);
          // TODO: أضف toast / snackbar للنجاح
        },
        error: (err) => {
          console.error('Failed to save schedule', err);
          // TODO: أضف toast / snackbar للخطأ
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