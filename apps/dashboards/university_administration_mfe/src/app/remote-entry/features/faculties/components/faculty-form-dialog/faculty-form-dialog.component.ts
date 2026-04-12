import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { FacultyRequest } from '@project-manara-frontend/models';
import {
  UserService,
  FacultyService,
  HttpErrorService,
  ToastService,
} from '@project-manara-frontend/services';
import { selectUniversityId } from '../../../../store/selectors/university.selectors';
import { filter, finalize, switchMap, take } from 'rxjs';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
@Component({
  selector: 'app-faculty-form-dialog',
  templateUrl: './faculty-form-dialog.component.html',
  styleUrls: ['./faculty-form-dialog.component.css'],
  standalone: false,
})
export class FacultyFormDialogComponent implements OnInit {
  facultyForm!: FormGroup;
  universityId$ = this.store.select(selectUniversityId);
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private httpErrorService: HttpErrorService,
    private facultyService: FacultyService,
    private dialogRef: MatDialogRef<FacultyFormDialogComponent>,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.facultyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

      website: [
        '',
        [
          Validators.required,
          Validators.pattern(RegexPatternConsts.WEB_SITE_URL_PATTERN),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.facultyForm.invalid) {
      this.facultyForm.markAllAsTouched();
      return;
    }

    this.universityId$
      .pipe(
        filter((id): id is number => !!id),
        take(1),
        switchMap((universityId) => {
          this.isLoading = true;

          return this.facultyService
            .create(universityId, this.facultyForm.value)
            .pipe(finalize(() => (this.isLoading = false)));
        }),
      )
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.toastService.success('Faculty created successfully!');
        },
        error: (errors) => {
          this.httpErrorService.handle(errors);
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
