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
} from '@project-manara-frontend/services';

import {
  DayResponse,
  PeriodResponse,
  SubjectResponse,
} from '@project-manara-frontend/models';

import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ProgramLectureScheduleFormDialogComponent } from '../../components/program-lecture-schedule-form-dialog/program-lecture-schedule-form-dialog.component';

@Component({
  selector: 'app-program-sections-schedule',
  standalone: false,
  templateUrl: './program-sections-schedule.component.html',
  styleUrls: ['./program-sections-schedule.component.css'],
})
export class ProgramSectionsScheduleComponent implements OnInit {
  loading = false;

  programId!: number;
  subjects: SubjectResponse[] = [];
  periods: PeriodResponse[] = [];
  days: DayResponse[] = [];
  slots: {
    subject: SubjectResponse;
    instructorId: number;
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
            schedules: this.scheduleService.getSectionsSchedule(this.programId),
          });
        }),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (data) => this.initializeSchedule(data),
        error: (error) => console.error('Load error:', error),
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
            instructorId: number;
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
          instructorId: schedule.instructorId,
          maxSlots: schedule.maxSlots,
        });
      }
    });

    this.slots = [...this.slots];
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
        let dialogRef = this.matDialog.open(
          ProgramLectureScheduleFormDialogComponent,
          {
            data: {
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
                instructorId: result.instructor,
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
    const request: any[] = [];

    this.slots.forEach((daySlots, dayIdx) => {
      daySlots.forEach((subjects, periodIdx) => {
        subjects.forEach((item) => {
          request.push({
            subjectId: item.subject.id,
            dayId: this.days[dayIdx].id,
            periodId: this.periods[periodIdx].id,
            instructorId: item.instructorId,
            maxSlots: item.maxSlots,
          });
        });
      });
    });

    this.scheduleService
      .saveSectionsSchedule(this.programId, request)
      .subscribe({
        next: () => this.notificationService.success('Schedule saved'),
        error: (error) => console.error('Save error:', error),
      });
  }

  reset(): void {
    this.slots = this.days.map(() =>
      this.periods.map(
        () =>
          [] as {
            subject: SubjectResponse;
            instructorId: number;
            maxSlots: number;
          }[],
      ),
    );
  }
}
