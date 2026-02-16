import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  RoleResponse,
  ScopeDetailResponse
} from '@project-manara-frontend/models';
import { FacultyUserService, ScopeService } from '@project-manara-frontend/services';
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
    private dialogRef: MatDialogRef<StaffFormDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadScope();
  }

  // =====================
  // Form Setup
  // =====================
  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ssn: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [[] as string[], [this.rolesRequiredValidator]],
      isDisabled: [false]
    });
  }

  private rolesRequiredValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || !Array.isArray(value) || value.length === 0) {
      return { required: true };
    }
    return null;
  }

  // =====================
  // Load Scope
  // =====================
  private loadScope(): void {
    this.scope$ = this.scopeService.get('faculty').pipe(
      tap((scope: ScopeDetailResponse) => {
        this.availableRoles = scope.roles || [];
      })
    );
  }

  // =====================
  // Roles Helpers
  // =====================
  getSelectedRoles(): string[] {
    return this.form.get('roles')?.value || [];
  }

  // =====================
  // Submit
  // =====================
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const request = this.form.value;

    this.facultyUserService.create(1, request).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Failed to create staff:', err);
        if (err.error?.message) {
          alert(err.error.message);
        } else {
          alert('Failed to create staff member. Please try again.');
        }
      }
    });
  }


  onClose(): void {
    this.dialogRef.close();
  }
}
