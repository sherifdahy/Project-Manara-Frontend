import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, forkJoin, switchMap, take } from 'rxjs';

import {
  DayService,
  PeriodsService,
  ProgramScheduleService,
  ProgramSubjectService,
  NotificationService,
  HttpErrorService,
} from '@project-manara-frontend/services';

import {
  DayResponse,
  PeriodResponse,
  ProgramLectureScheduleRequest,
  SubjectResponse,
} from '@project-manara-frontend/models';

import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ProgramLectureScheduleFormDialogComponent } from '../../components/program-lecture-schedule-form-dialog/program-lecture-schedule-form-dialog.component';

@Component({
  selector: 'app-program-lectures-schedule',
  standalone: false,
  templateUrl: './program-lectures-schedule.component.html',
  styleUrls: ['./program-lectures-schedule.component.css'],
})
export class ProgramLecturesScheduleComponent implements OnInit {
  loading = false;

  programId!: number;
  subjects: SubjectResponse[] = [];
  periods: PeriodResponse[] = [];
  days: DayResponse[] = [];
  slots: {
    subject: SubjectResponse;
    doctorId: number;
    maxSlots: number;
  }[][][] = [];

  constructor(
    private readonly subjectService: ProgramSubjectService,
    private readonly scheduleService: ProgramScheduleService,
    private readonly route: ActivatedRoute,
    private readonly periodService: PeriodsService,
    private readonly store: Store,
    private readonly dayService: DayService,
    private readonly notificationService: NotificationService,
    private readonly httpErrorService: HttpErrorService,
    private readonly matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.programId = this.route.snapshot.parent?.params['id'];
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.store
      .select(selectFacultyId)
      .pipe(
        take(1),
        switchMap((facultyId) => {
          if (!facultyId) throw new Error('Faculty not found');

          return forkJoin({
            periods: this.periodService.getAll(facultyId),
            subjects: this.subjectService.getSubjects(this.programId),
            days: this.dayService.getAll(),
            schedules: this.scheduleService.getLecturesSchedule(this.programId),
          });
        }),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (data) => this.initializeSchedule(data),
        error: (error) => this.httpErrorService.handle(error),
      });
  }

  private initializeSchedule(data: any): void {
    this.periods = data.periods ?? [];
    this.subjects = data.subjects ?? [];
    this.days = data.days ?? [];

    this.slots = this.days.map(() =>
      this.periods.map(
        () =>
          [] as {
            subject: SubjectResponse;
            doctorId: number;
            maxSlots: number;
          }[],
      ),
    );

    data.schedules?.forEach((schedule: any) => {
      const dayIdx = this.days.findIndex((d) => d.id === schedule.dayId);
      const periodIdx = this.periods.findIndex(
        (p) => p.id === schedule.periodId,
      );

      if (dayIdx === -1 || periodIdx === -1) return;

      const subject = this.subjects.find((s) => s.id === schedule.subjectId);
      if (!subject) return;

      const exists = this.slots[dayIdx][periodIdx].some(
        (s) => s.subject.id === subject.id,
      );

      if (!exists) {
        this.slots[dayIdx][periodIdx].push({
          subject,
          doctorId: schedule.doctorId,
          maxSlots: schedule.maxSlots,
        });
      }
    });

    this.slots = [...this.slots];
  }

  onClickHandler(event: MouseEvent, di: number, ti: number, id: number) {
    event.stopPropagation();

    const slot = this.slots[di][ti].find((s) => s.subject.id === id);

    if (!slot) return;

    const dialogRef = this.matDialog.open(
      ProgramLectureScheduleFormDialogComponent,
      {
        data: {
          mode: 'edit',
          departmentId: this.route.snapshot.parent?.parent?.parent?.params['id'],
          subject: slot.subject,
          period: this.periods[ti],
          day: this.days[di],
          maxSlots: slot.maxSlots,
          doctorId: slot.doctorId,
        },
      },
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.slots[di][ti].findIndex(
          (s) => s.subject.id === slot.subject.id,
        );

        if (index === -1) return;

        this.slots[di][ti][index] = {
          ...this.slots[di][ti][index],
          doctorId: result.doctorId,
          maxSlots: result.maxSlots,
        };

        this.slots = [...this.slots];
      }
    });
  }

  onDropToCell(
    event: CdkDragDrop<any>,
    dayIdx: number,
    periodIdx: number,
  ): void {
    const data = event.item.data;

    if (event.previousContainer.id === 'subjects-pool') {
      const exists = this.slots[dayIdx][periodIdx].some(
        (s) => s.subject.id === data.id,
      );
      if (!exists) {
        console.log(this.slots);

        let dialogRef = this.matDialog.open(
          ProgramLectureScheduleFormDialogComponent,
          {
            data: {
              mode: 'add',
              departmentId: this.route.snapshot.parent?.parent?.parent?.params['id'],
              subject: data,
              period: this.periods[periodIdx],
              day: this.days[dayIdx],
            },
          },
        );

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.slots[dayIdx][periodIdx] = [
              ...this.slots[dayIdx][periodIdx],
              {
                subject: data,
                doctorId: result.doctorId,
                maxSlots: result.maxSlots,
              },
            ];
            this.slots = [...this.slots];
          }
        });
      }
      return;
    }

    const { dayIndex: srcDayIdx, periodIndex: srcPeriodIdx, subjectId } = data;

    if (srcDayIdx === dayIdx && srcPeriodIdx === periodIdx) return;

    const srcSlot = this.slots[srcDayIdx][srcPeriodIdx];
    const targetSlot = this.slots[dayIdx][periodIdx];
    const subjectIdx = srcSlot.findIndex((s) => s.subject.id === subjectId);

    if (subjectIdx === -1) return;

    const subject = srcSlot[subjectIdx];
    const alreadyExists = targetSlot.some(
      (s) => s.subject.id === subject.subject.id,
    );

    if (alreadyExists) return;

    this.slots[srcDayIdx][srcPeriodIdx] = srcSlot.filter(
      (s) => s.subject.id !== subjectId,
    );
    this.slots[dayIdx][periodIdx] = [...targetSlot, subject];
    this.slots = [...this.slots];
  }

  onDropBackToPool(event: CdkDragDrop<any>): void {
    const { dayIndex, periodIndex, subjectId } = event.item.data;
    if (dayIndex === undefined || periodIndex === undefined) return;

    this.slots[dayIndex][periodIndex] = this.slots[dayIndex][
      periodIndex
    ].filter((s) => s.subject.id !== subjectId);
    this.slots = [...this.slots];
  }

  get allDropLists(): string[] {
    const ids = ['subjects-pool'];
    this.days.forEach((_, di) => {
      this.periods.forEach((_, pi) => {
        ids.push(`slot-${di}-${pi}`);
      });
    });
    return ids;
  }

  trackBySubject(i: number, item: any): number {
    return item.subject?.id ?? item.id;
  }

  save(): void {
    const request: ProgramLectureScheduleRequest[] = [];

    this.slots.forEach((daySlots, dayIdx) => {
      daySlots.forEach((subjects, periodIdx) => {
        subjects.forEach((item) => {
          request.push({
            subjectId: item.subject.id,
            dayId: this.days[dayIdx].id,
            periodId: this.periods[periodIdx].id,
            doctorId: item.doctorId,
            maxSlots: item.maxSlots,
          });
        });
      });
    });

    this.scheduleService
      .saveLecturesSchedule(this.programId, request)
      .subscribe({
        next: () => this.notificationService.success('Schedule saved'),
        error: (error) => this.httpErrorService.handle(error),
      });
  }

  reset(): void {
    this.slots = this.days.map(() =>
      this.periods.map(
        () =>
          [] as {
            subject: SubjectResponse;
            doctorId: number;
            maxSlots: number;
          }[],
      ),
    );
  }
}
