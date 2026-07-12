import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LectureStatus, StudentLecture } from '@project-manara-frontend/models';
import { StudentsService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';
import { SetGpaDialogComponent } from './components/set-gpa-dialog/set-gpa-dialog.component';

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
    private dialog: MatDialog,
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

  openGpaDialog(item: StudentLecture) {
    const dialogRef = this.dialog.open(SetGpaDialogComponent, {
      width: '420px',
      data: { item, studentId: this.studentId },
    });

    dialogRef.afterClosed().subscribe((saved) => {
      if (saved) {
        this.loadSubjects();
      }
    });
  }
}
