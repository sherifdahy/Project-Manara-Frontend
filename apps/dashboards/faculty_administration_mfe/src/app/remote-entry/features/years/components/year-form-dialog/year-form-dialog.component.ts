import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { filter, Observable, take } from 'rxjs';
import {
  HttpErrorService,
  ToastService,
  YearsService,
} from '@project-manara-frontend/services';
import { TermResponse } from '@project-manara-frontend/models';

@Component({
  selector: 'app-year-form-dialog',
  standalone: false,
  templateUrl: './year-form-dialog.component.html',
  styleUrls: ['./year-form-dialog.component.css'],
})
export class YearFormDialogComponent implements OnInit {
  yearForm!: FormGroup;
  facultyId$ = this.store.select(selectFacultyId);
  terms$!: Observable<TermResponse[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<YearFormDialogComponent>,
    private store: Store,
    private yearService: YearsService,
    private toastService: ToastService,
    private httpErrorService: HttpErrorService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTerms();
  }

  initForm(): void {
    this.yearForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      activeTermId: ['', [Validators.required]],
    });
  }
  loadTerms() {
    this.terms$ = this.yearService.getAllTerms();
  }

  onSubmit(): void {
    if (this.yearForm.valid) {
      this.facultyId$
        .pipe(
          filter((id) => !!id),
          take(1),
        )
        .subscribe((facultyId) => {
          this.yearService.create(facultyId!, this.yearForm.value).subscribe({
            next: () => {
              this.dialogRef.close(true);
              this.toastService.success('Year created successfully!');
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
