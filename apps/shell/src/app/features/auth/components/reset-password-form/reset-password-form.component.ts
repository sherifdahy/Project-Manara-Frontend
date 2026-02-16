import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
import { NewPasswordRequest } from '@project-manara-frontend/models';
import { AuthService } from '@project-manara-frontend/services';
import { ToastrService } from 'ngx-toastr';
import { passwordMatch } from '@project-manara-frontend/utilities';
@Component({
  selector: 'app-reset-password-form',
  standalone: false,
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.css',
})
export class ResetPasswordFormComponent implements OnInit {
  @ViewChild('errorMessage') errorMessageRef!: ElementRef<HTMLDivElement>;
  form!: FormGroup;
  code!: string;
  email!: string;
  constructor(
    private formBuilder: FormBuilder,
    private activeatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.buildForm();
    this.setCode();
    this.setEmail();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request = this.form.value as NewPasswordRequest;
    this.callEndPoint(request);
  }
  private buildForm() {
    this.form = this.formBuilder.group(
      {
        newPassword: [
          '',
          [Validators.required, Validators.pattern(RegexPatternConsts.PASSWORD_PATTERN)],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatch() }
    );
  }
  private setCode() {
    this.activeatedRoute.queryParamMap.subscribe((params) => {
      this.code = params.get('code') ?? '';
    });
  }
  private setEmail() {
    this.activeatedRoute.queryParamMap.subscribe((params) => {
      this.email = params.get('email') ?? '';
    });
  }
  private callEndPoint(request: NewPasswordRequest) {
    request.code = this.code;
    request.email = this.email;
    this.authService.resetPassword(request).subscribe({
      next: () => this.submitSuccess(),
    });
  }
  private submitSuccess() {
    this.toastrService.success('new Password Has Change');
    this.router.navigate(['/auth/login']);
  }

  get newPassword(): any {
    return this.form.get('newPassword');
  }
  get confirmPassword(): any {
    return this.form.get('confirmPassword');
  }
}
