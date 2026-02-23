import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  RoleResponse,
  ScopeDetailResponse
} from '@project-manara-frontend/models';
import { FacultyUserService, HttpErrorService, ScopeService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-staff-form-dialog',
  standalone: false,
  templateUrl: './staff-form-dialog.component.html',
  styleUrls: ['./staff-form-dialog.component.css']
})
export class StaffFormDialogComponent implements OnInit {

  form!: FormGroup;
  showPassword = false;
  scope$!: Observable<ScopeDetailResponse>;

  availableRoles: RoleResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private facultyUserService: FacultyUserService,
    private scopeService: ScopeService,
    private dialogRef: MatDialogRef<StaffFormDialogComponent>,
    private httpErrorService: HttpErrorService,
    @Inject(MAT_DIALOG_DATA) public data: { facultyId: number }
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadScope();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ssn: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [[] as string[], Validators.required],
      isDisabled: [false]
    });
  }

  private loadScope(): void {
    this.scope$ = this.scopeService.get('faculty').pipe(
      tap((scope: ScopeDetailResponse) => {
        this.availableRoles = scope.roles || [];
      })
    );
  }

  getSelectedRoles(): string[] {
    return this.form.get('roles')?.value || [];
  }

  onSubmit(): void {

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const request = this.form.value;

    this.facultyUserService.create(this.data.facultyId, request).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.httpErrorService.handle(err);
      }
    });
  }


  onClose(): void {
    this.dialogRef.close();
  }
}
