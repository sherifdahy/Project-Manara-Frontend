import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LectureStatus, StudentLecture } from '@project-manara-frontend/models';
import { StudentsService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-subjects',
  standalone: false,
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.css'],
})
export class StudentSubjectsComponent {
  studentSubjects$!: Observable<StudentLecture[]>;
  studentId!: number;

  private readonly statusMap: Record<
    LectureStatus,
    { cssClass: string; label: string }
  > = {
    Completed: { cssClass: 'status-active', label: 'Completed' },
    CurrentlyEnrolled: { cssClass: 'status-current', label: 'Enrolled' },
    Available: { cssClass: 'status-inactive', label: 'Available' },
    Locked: { cssClass: 'status-locked', label: 'Locked' },
  };

  constructor(
    private route: ActivatedRoute,
    private studentSubjectsService: StudentsService,
  ) {
    this.studentId = this.route.parent?.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.studentSubjects$ = this.studentSubjectsService.getAcademicProgress(
      this.studentId,
    );
  }

  getStatusClass(status: LectureStatus): string {
    return this.statusMap[status]?.cssClass ?? '';
  }

  getStatusLabel(status: LectureStatus): string {
    return this.statusMap[status]?.label ?? status;
  }

  // هيتفعل لما نبدأ feature تحديد GPA للمادة
  // setGpa(item: StudentLecture) { ... }
}
