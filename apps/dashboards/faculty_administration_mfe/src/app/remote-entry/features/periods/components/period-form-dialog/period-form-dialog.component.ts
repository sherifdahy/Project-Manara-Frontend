import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, take } from 'rxjs';
import {
  HttpErrorService,
  PeriodsService,
  ToastService,
} from '@project-manara-frontend/services';

@Component({
  selector: 'app-period-form-dialog',
  standalone: false,
  templateUrl: './period-form-dialog.component.html',
  styleUrls: ['./period-form-dialog.component.css'],
})
export class PeriodFormDialogComponent implements OnInit {
  periodForm!: FormGroup;
  facultyId$ = this.store.select(selectFacultyId);
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PeriodFormDialogComponent>,
    private toastService: ToastService,
    private httpErrorService: HttpErrorService,
    private periodService: PeriodsService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.periodForm = this.fb.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.periodForm.valid) {
      this.facultyId$
        .pipe(
          filter((id) => !!id),
          take(1),
        )
        .subscribe((facultyId) => {
          this.periodService
            .create(facultyId!, this.periodForm.value)
            .subscribe({
              next: () => {
                this.dialogRef.close(true);
                this.toastService.success('Period created successfully!');
              },
              error: (errors) => {
                this.httpErrorService.handle(errors);
              },
            });
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
