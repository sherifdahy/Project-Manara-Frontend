import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { filter, take } from 'rxjs/operators';
import {
  DepartmentService,
  HttpErrorService,
  ToastService,
} from '@project-manara-frontend/services';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-department-form-dialog',
  standalone: false,
  templateUrl: './department-form-dialog.component.html',
  styleUrls: ['./department-form-dialog.component.css'],
})
export class DepartmentFormDialogComponent implements OnInit {
  departmentForm!: FormGroup;
  facultyId$ = this.store.select(selectFacultyId);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private departmentService: DepartmentService,
    private httpErrorService: HttpErrorService,
    private dialogRef: MatDialogRef<DepartmentFormDialogComponent>,
    private toastService: ToastService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      headOfDepartment: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      this.facultyId$
        .pipe(
          filter((id) => !!id),
          take(1),
        )
        .subscribe((facultyId) => {
          this.departmentService
            .create(facultyId!, this.departmentForm.value)
            .subscribe({
              next: () => {
                this.dialogRef.close(true);
                this.toastService.success('Department created successfully!');
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
