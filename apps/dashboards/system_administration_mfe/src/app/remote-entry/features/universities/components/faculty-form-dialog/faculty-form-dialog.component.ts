import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FacultyRequest } from '@project-manara-frontend/models';
import { FacultyService, HttpErrorService, ToastService } from '@project-manara-frontend/services';
@Component({
  selector: 'app-faculty-form-dialog',
  templateUrl: './faculty-form-dialog.component.html',
  styleUrls: ['./faculty-form-dialog.component.css'],
  standalone: false,
})
export class FacultyFormDialogComponent implements OnInit {

  facultyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private httpErrorService: HttpErrorService,
    private facultyService: FacultyService,
    private dialogRef: MatDialogRef<FacultyFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { universityId: number }
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.facultyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.facultyForm.valid) {
      let payload = this.facultyForm.value as FacultyRequest;

      payload.universityId = this.data.universityId;

      this.facultyService.create(this.facultyForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close(true);
          this.toastService.success('Faculty created successfully!');
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
