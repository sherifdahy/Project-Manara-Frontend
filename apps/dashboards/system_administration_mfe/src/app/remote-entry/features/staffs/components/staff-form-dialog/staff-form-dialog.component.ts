import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
import {
  RoleResponse,
  ScopeDetailResponse
} from '@project-manara-frontend/models';
import { HttpErrorService, ScopeService, UniversityUserService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

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
  universityId: number;
  constructor(
    private fb: FormBuilder,
    private universityUserService: UniversityUserService,
    private scopeService: ScopeService,
    private httpErrorService: HttpErrorService,
    private dialogRef: MatDialogRef<StaffFormDialogComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data: { universityId: number }
  ) {
    this.universityId = this.data.universityId;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadScope();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ssn: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(RegexPatternConsts.PASSWORD_PATTERN)]],
      roles: [[] as string[], [Validators.required]],
      isDisabled: [false]
    });
  }


  private loadScope(): void {
    this.scope$ = this.scopeService.get('university').pipe(
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

    this.universityUserService.create(this.universityId, request).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.httpErrorService.handle(err);
      }
    })
  }


  onClose(): void {
    this.dialogRef.close();
  }
}
