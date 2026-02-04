import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
import { HttpErrorService, UniversityService } from '@project-manara-frontend/services';

@Component({
  selector: 'app-university-form-dialog',
  standalone: false,
  templateUrl: './university-form-dialog.component.html',
  styleUrls: ['./university-form-dialog.component.css']
})
export class UniversityFormDialogComponent implements OnInit {
  form!: FormGroup;
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private httpErrorService: HttpErrorService,
    private universityService: UniversityService,
    @Inject(MAT_DIALOG_DATA) public data: { universityId?: number },
    private dialogRef: MatDialogRef<UniversityFormDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.formInit();

    if (this.data?.universityId) {
      this.loadUniversity();
    }
  }

  formInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required, Validators.pattern(RegexPatternConsts.WEB_SITE_URL_PATTERN)]],
      yearOfEstablishment: ['', [
        Validators.required,
        Validators.min(1800),
        Validators.max(this.currentYear)
      ]]
    });
  }

  loadUniversity(): void {
    this.universityService.get(this.data.universityId!).subscribe({
      next: (response) => {
        this.form.patchValue(response);
      },
      error: (errors) => {
        this.httpErrorService.handle(errors);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const submitObservable = this.data?.universityId
      ? this.universityService.update(this.data.universityId, this.form.value)
      : this.universityService.create(this.form.value);

    submitObservable.subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (errors) => {
        this.httpErrorService.handle(errors);
      }
    });
  }
}
