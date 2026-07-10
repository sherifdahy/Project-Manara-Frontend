import { Component, inject, input, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { StudentsService } from '../../core/services/students.service';
import { StudentLecture } from './models/student-lecture';

@Component({
  selector: 'app-academic-progress',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './academic-progress.component.html',
  styleUrls: ['./academic-progress.component.css'],
})
export class AcademicProgressComponent implements OnInit {
  studentsService = inject(StudentsService);

  studentId = this.studentsService.student$.value?.id;

  lectures: StudentLecture[] = [];

  totalSubjects = 0;
  completedCount = 0;
  availableCount = 0;
  lockedCount = 0;

  ngOnInit(): void {
    this.loadAcademicProgress();
  }

  private loadAcademicProgress(): void {
    this.studentsService
      .getAcademicProgress(this.studentId!)
      .subscribe((lectures) => {
        this.lectures = lectures;
        this.calculateSummary();
      });
  }

  private calculateSummary(): void {
    this.totalSubjects = this.lectures.length;

    this.completedCount = this.countByStatus('Completed');
    this.availableCount = this.countByStatus('Available');
    this.lockedCount = this.countByStatus('Locked');
  }

  private countByStatus(status: string): number {
    return this.lectures.filter((lecture) => lecture.status === status).length;
  }
}
