import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { filter, Observable, switchMap } from 'rxjs';
import { TermResponse, YearResponse } from '@project-manara-frontend/models';
import {
  HttpErrorService,
  ProgramEnrollmentsService,
  YearsService,
} from '@project-manara-frontend/services';

@Component({
  selector: 'app-edit-program-enrollment',
  standalone: false,
  templateUrl: './edit-program-enrollment.component.html',
  styleUrls: ['./edit-program-enrollment.component.css'],
})
export class EditProgramEnrollmentComponent implements OnInit {
  enrollmentForm!: FormGroup;
  facultyId$ = this.store.select(selectFacultyId);
  terms$!: Observable<TermResponse[]>;
  years$!: Observable<YearResponse[]>;
  enrollmentId!: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditProgramEnrollmentComponent>,
    private store: Store,
    private fb: FormBuilder,
    private yearService: YearsService,
    private programEnrollmentsService: ProgramEnrollmentsService,
    private httpErrorService: HttpErrorService,
  ) {
    this.enrollmentId = data.enrollmentId;
  }

  ngOnInit() {
    this.initForm();
    this.loadTerms();
    this.loadYears();
    this.loadEnrollmentData();
  }
  initForm(): void {
    this.enrollmentForm = this.fb.group({
      termId: ['', [Validators.required]],
      yearId: ['', [Validators.required]],
    });
  }

  loadTerms() {
    this.terms$ = this.yearService.getAllTerms();
  }
  loadYears(): void {
    this.years$ = this.facultyId$.pipe(
      filter((id): id is number => !!id),
      switchMap((id) => this.yearService.getAll(id, false)),
    );
  }
  loadEnrollmentData() {
    this.programEnrollmentsService.get(this.enrollmentId).subscribe({
      next: (enrollment) => {
        this.enrollmentForm.patchValue({
          termId: enrollment.termId,
          yearId: enrollment.yearId,
        });
      },
      error: (error) => {
        this.httpErrorService.handle(error);
      },
    });
  }
  onSubmit(): void {
    if (this.enrollmentForm.valid) {
      this.programEnrollmentsService
        .edit(this.enrollmentId, this.enrollmentForm.value)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (errors) => {
            this.httpErrorService.handle(errors);
          },
        });
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
