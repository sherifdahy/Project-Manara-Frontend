import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize, forkJoin, take } from 'rxjs';
import { StudentsService } from '../../../../../../../../libs/services/src/lib/students/students.service';
import {
  DayService,
  PeriodsService,
  HttpErrorService,
  NotificationService,
} from '@project-manara-frontend/services';
import { DayResponse, PeriodResponse } from '@project-manara-frontend/models';
import { AvailableLectureResponse } from '../../../../../../../../libs/models/src/lib/students/responses/available-lecture-response';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';

interface SlotItem {
  lectureScheduleId: number;
  subjectId: number;
  subjectName: string;
  doctorName: string;
  remainingSlots: number;
  selected: boolean;
  isFull: boolean;
}

@Component({
  selector: 'app-course-registration',
  imports: [NgIf, NgFor, SlicePipe],
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css'],
})
export class CourseRegistrationComponent implements OnInit {
  loading = false;
  selectingId: number | null = null;

  studentId!: number;
  facultyId!: number;

  days: DayResponse[] = [];
  periods: PeriodResponse[] = [];
  slots: SlotItem[][][] = [];

  // Summary stats
  totalSubjects = 0;
  enrolledSubjects = 0;
  availableSlotsCount = 0;
  fullSlotsCount = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly studentsService: StudentsService,
    private readonly dayService: DayService,
    private readonly periodService: PeriodsService,
    private readonly notificationService: NotificationService,
    private readonly httpErrorService: HttpErrorService,
    
  ) {}

  ngOnInit(): void {
    this.studentsService.student$
      .pipe(
        filter((student) => !!student),
        take(1),
      )
      .subscribe((student) => {
        this.studentId = student!.id;
        this.facultyId = student!.facultyId;
        this.loadData();
      });
  }

  loadData(): void {
    this.loading = true;

    forkJoin({
      days: this.dayService.getAll(),
      periods: this.periodService.getAll(this.facultyId),
      lectures: this.studentsService.getAvailableLectures(this.studentId),
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => this.initializeSchedule(data),
        error: (error) => this.httpErrorService.handle(error),
      });
  }

  private initializeSchedule(data: {
    days: DayResponse[];
    periods: PeriodResponse[];
    lectures: AvailableLectureResponse[];
  }): void {
    this.days = [...data.days].sort((a, b) => a.id - b.id);
    this.periods = [...data.periods].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    );

    this.slots = this.days.map(() => this.periods.map(() => [] as SlotItem[]));

    data.lectures.forEach((item) => {
      const dayIdx = this.days.findIndex((d) => d.id === item.day.id);
      const periodIdx = this.periods.findIndex((p) => p.id === item.period.id);

      if (dayIdx === -1 || periodIdx === -1) return;

      this.slots[dayIdx][periodIdx].push({
        lectureScheduleId: item.lectureSchedulesId,
        subjectId: item.subject.id,
        subjectName: item.subject.name,
        doctorName: item.doctor.name,
        remainingSlots: item.remainingSlots,
        selected: item.isCurrentEnrolled,
        isFull: item.remainingSlots <= 0 && !item.isCurrentEnrolled,
      });
    });

    this.slots = [...this.slots];
    this.calculateSummary(data.lectures);
  }

  private calculateSummary(lectures: AvailableLectureResponse[]): void {
    const uniqueSubjects = new Set(lectures.map((l) => l.subject.id));
    const enrolledSet = new Set(
      lectures.filter((l) => l.isCurrentEnrolled).map((l) => l.subject.id),
    );

    this.totalSubjects = uniqueSubjects.size;
    this.enrolledSubjects = enrolledSet.size;
    this.fullSlotsCount = lectures.filter(
      (l) => l.remainingSlots <= 0 && !l.isCurrentEnrolled,
    ).length;
    this.availableSlotsCount = lectures.length - this.fullSlotsCount;
  }

  selectLecture(item: SlotItem): void {
    if (this.selectingId) return;
    if (item.isFull) return;
    if (item.selected) return;

    this.selectingId = item.lectureScheduleId;

    this.studentsService
      .selectLecture(this.studentId, item.lectureScheduleId)
      .pipe(finalize(() => (this.selectingId = null)))
      .subscribe({
        next: () => {
          this.markSubjectAsSelected(item);
          this.notificationService.success('Lecture added to your schedule');
        },
        error: (error) => this.httpErrorService.handle(error),
      });
  }

  private markSubjectAsSelected(chosen: SlotItem): void {
    this.slots.forEach((daySlots) =>
      daySlots.forEach((periodSlots) =>
        periodSlots.forEach((s) => {
          if (s.subjectId !== chosen.subjectId) return;

          if (s.lectureScheduleId === chosen.lectureScheduleId) {
            s.selected = true;
            s.remainingSlots = Math.max(0, s.remainingSlots - 1);
            s.isFull = s.remainingSlots <= 0;
          } else {
            s.selected = false;
          }
        }),
      ),
    );
    this.slots = [...this.slots];
    this.enrolledSubjects = new Set(
      this.slots
        .flat(2)
        .filter((s) => s.selected)
        .map((s) => s.subjectId),
    ).size;
  }

  trackBySlot(_: number, item: SlotItem): number {
    return item.lectureScheduleId;
  }
}
