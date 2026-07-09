import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { StudentsService } from '../../core/services/students.service';
import {
  HttpErrorService,
  NotificationService,
} from '@project-manara-frontend/services';
import { AvailableLectureResponse } from './models/available-lecture-response';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';

interface DayInfo {
  id: number;
  value: string;
}

interface PeriodInfo {
  id: number;
  startTime: string;
  endTime: string;
}

interface SlotItem {
  lectureScheduleId: number;
  subjectId: number;
  subjectName: string;
  doctorName: string;
  selected: boolean;
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

  studentId: number = 175;
  days: DayInfo[] = [];
  periods: PeriodInfo[] = [];
  slots: SlotItem[][][] = [];

  selectedBySubject = new Map<number, number>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: StudentsService,
    private readonly notificationService: NotificationService,
    private readonly httpErrorService: HttpErrorService,
  ) {}

  ngOnInit(): void {
    // this.studentId = this.route.snapshot.params['studentId'];
    this.studentId = 186; // TODO: رجّعها من الـ route لما تخلص تظبيط
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.scheduleService
      .getAvailableLectures(this.studentId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => this.initializeSchedule(data),
        error: (error) => this.httpErrorService.handle(error),
      });
  }

  private initializeSchedule(data: AvailableLectureResponse[]): void {
    const dayMap = new Map<number, DayInfo>();
    const periodMap = new Map<number, PeriodInfo>();

    data.forEach((item) => {
      dayMap.set(item.day.id, item.day);
      periodMap.set(item.period.id, item.period);
    });

    this.days = [...dayMap.values()].sort((a, b) => a.id - b.id);
    this.periods = [...periodMap.values()].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    );

    this.slots = this.days.map(() => this.periods.map(() => [] as SlotItem[]));

    data.forEach((item) => {
      const dayIdx = this.days.findIndex((d) => d.id === item.day.id);
      const periodIdx = this.periods.findIndex((p) => p.id === item.period.id);
      if (dayIdx === -1 || periodIdx === -1) return;

      this.slots[dayIdx][periodIdx].push({
        lectureScheduleId: item.lectureSchedulesId,
        subjectId: item.subject.id,
        subjectName: item.subject.name,
        doctorName: item.doctor.name,
        selected:
          this.selectedBySubject.get(item.subject.id) ===
          item.lectureSchedulesId,
      });
    });

    this.slots = [...this.slots];
  }

  selectLecture(item: SlotItem): void {
    if (this.selectingId) return; // منع دوس مزدوج وقت الريكوست

    this.selectingId = item.lectureScheduleId;

    this.scheduleService
      .selectLecture(this.studentId, item.lectureScheduleId)
      .pipe(finalize(() => (this.selectingId = null)))
      .subscribe({
        next: () => {
          this.selectedBySubject.set(item.subjectId, item.lectureScheduleId);
          this.refreshSelectedFlags();
          this.notificationService.success('Lecture added to your schedule');
        },
        error: (error) => this.httpErrorService.handle(error),
      });
  }

  private refreshSelectedFlags(): void {
    this.slots.forEach((daySlots) =>
      daySlots.forEach((periodSlots) =>
        periodSlots.forEach((s) => {
          s.selected =
            this.selectedBySubject.get(s.subjectId) === s.lectureScheduleId;
        }),
      ),
    );
    this.slots = [...this.slots];
  }

  trackBySlot(_: number, item: SlotItem): number {
    return item.lectureScheduleId;
  }
}
