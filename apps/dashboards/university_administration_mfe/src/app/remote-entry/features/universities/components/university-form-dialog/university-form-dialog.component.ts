import { Component, destroyPlatform, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorService, UniversityService } from '@project-manara-frontend/services';

@Component({
  selector: 'app-university-form-dialog',
  standalone: false,
  templateUrl: './university-form-dialog.component.html',
  styleUrls: ['./university-form-dialog.component.css']
})
export class UniversityFormDialogComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpErrorService: HttpErrorService,
    private universityService: UniversityService,
    @Inject(MAT_DIALOG_DATA) public data: { universityId?: number },
    private dialogRef: MatDialogRef<UniversityFormDialogComponent>
  ) { }

  ngOnInit() {
    this.formInit();

    if (this.data?.universityId)
      this.loadUniversity();
  }

  formInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required]],
      establishedAt: ['', Validators.required]
    });
  }

  loadUniversity() {
    this.universityService.get(this.data.universityId!).subscribe({
      next: (response) => {
        this.form.patchValue(response);
      },
      error: (errors) => {
        this.httpErrorService.handle(errors);
      }
    });
  }
}
