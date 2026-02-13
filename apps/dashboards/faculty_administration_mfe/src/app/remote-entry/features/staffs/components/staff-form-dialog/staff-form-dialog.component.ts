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
  FacultyUserRequest,
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

  // Roles data
  availableRoles: RoleResponse[] = [];

  // Roles dropdown state
  isRolesDropdownOpen = false;
  roleSearchTerm = '';

  constructor(
    private fb: FormBuilder,
    private facultyUserService: FacultyUserService,
    private scopeService: ScopeService,
    private dialogRef: MatDialogRef<StaffFormDialogComponent>
  ) { }

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
      roles: [[] as string[], [this.rolesRequiredValidator]]
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
  // Load Scope → Extract Roles
  // =====================
  private loadScope(): void {
    this.scope$ = this.scopeService.get('faculty').pipe(
      tap((scope: ScopeDetailResponse) => {
        this.availableRoles = scope.roles || [];
      })
    );
  }

  // =====================
  // Roles Multi-Select
  // =====================
  get filteredRoles(): RoleResponse[] {
    if (!this.roleSearchTerm) {
      return this.availableRoles;
    }
    const term = this.roleSearchTerm.toLowerCase();
    return this.availableRoles.filter(role =>
      role.name.toLowerCase().includes(term)
    );
  }

  isRoleSelected(roleName: string): boolean {
    const roles: string[] = this.form.get('roles')?.value || [];
    return roles.includes(roleName);
  }

  getSelectedRoles(): string[] {
    return this.form.get('roles')?.value || [];
  }

  toggleRole(roleName: string): void {
    const roles: string[] = [...(this.form.get('roles')?.value || [])];
    const index = roles.indexOf(roleName);

    if (index > -1) {
      roles.splice(index, 1);
    } else {
      roles.push(roleName);
    }

    this.form.patchValue({ roles });
    this.form.get('roles')?.markAsTouched();
    this.form.get('roles')?.updateValueAndValidity();
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

  // =====================
  // Close
  // =====================
  onClose(): void {
    this.dialogRef.close();
  }
}
