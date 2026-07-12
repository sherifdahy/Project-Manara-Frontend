import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentLecture } from '@project-manara-frontend/models';
import { StudentsService } from '@project-manara-frontend/services';

export interface SetGpaDialogData {
  item: StudentLecture;
  studentId: number;
}

@Component({
  selector: 'app-set-gpa-dialog',
  standalone: false,
  templateUrl: './set-gpa-dialog.component.html',
  styleUrls: ['./set-gpa-dialog.component.css'],
})
export class SetGpaDialogComponent {
  gpaControl = new FormControl<number | null>(this.data.item.gpa, [
    Validators.required,
    Validators.min(0),
    Validators.max(4),
  ]);

  submitting = false;
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<SetGpaDialogComponent>,
    private studentsService: StudentsService,
    @Inject(MAT_DIALOG_DATA) public data: SetGpaDialogData,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.gpaControl.invalid) return;

    const lectureScheduleId = this.data.item.lectureScheduleId;
    if (lectureScheduleId == null) {
      this.errorMessage = 'لا يوجد جدول محاضرة لهذه المادة.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    this.studentsService
      .setGpa(this.data.studentId, lectureScheduleId, this.gpaControl.value!)
      .subscribe({
        next: () => {
          this.submitting = false;
          this.dialogRef.close(true);
        },
        error: () => {
          this.submitting = false;
          this.errorMessage = 'حصل خطأ أثناء حفظ الـ GPA، حاول تاني.';
        },
      });
  }
}
