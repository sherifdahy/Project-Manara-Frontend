import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  RoleResponse,
  ScopeDetailResponse,
} from '@project-manara-frontend/models';
import {
  DepartmentUserService,
  HttpErrorService,
  ScopeService,
} from '@project-manara-frontend/services';
import { RegexPatternConsts } from 'libs/consts/src/lib/regex-pattern-consts';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-department-staff-form-dialog',
  standalone: false,
  templateUrl: './department-staff-form-dialog.component.html',
  styleUrls: ['./department-staff-form-dialog.component.css'],
})
export class DepartmentStaffFormDialogComponent implements OnInit {
  form!: FormGroup;
  scope$!: Observable<ScopeDetailResponse>;
  availableRoles: RoleResponse[] = [];
  showPassword = false;
  constructor(
    private fb: FormBuilder,
    private scopeService: ScopeService,
    private dialogRef: MatDialogRef<DepartmentStaffFormDialogComponent>,
    private httpErrorService: HttpErrorService,
    private departmentUserService: DepartmentUserService,
    @Inject(MAT_DIALOG_DATA) public data: { departmentId: number },
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadScope();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ssn: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(RegexPatternConsts.PASSWORD_PATTERN),
        ],
      ],
      roles: [[] as string[], Validators.required],
      isDisabled: [false],
    });
  }

  private loadScope(): void {
    this.scope$ = this.scopeService.get('department').pipe(
      tap((scope: ScopeDetailResponse) => {
        this.availableRoles = scope.roles || [];
      }),
    );
  }
  getSelectedRoles(): string[] {
    return this.form.get('roles')?.value || [];
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const request = this.form.value;

    this.departmentUserService
      .create(this.data.departmentId, request)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.httpErrorService.handle(err);
        },
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
