import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from '@project-manara-frontend/models';
import { AuthNavigationService, AuthService, HttpErrorService, ToastService } from '@project-manara-frontend/services';
@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('errorMessage') errorMessageRef!: ElementRef<HTMLDivElement>;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private httpErrorService : HttpErrorService,
    private authNavigationService: AuthNavigationService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let request = this.form.value as LoginRequest;

    this.authService.login(request).subscribe({
      next: (response) => {
        let returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
        this.authNavigationService.redirect(returnUrl);
      },
      error: (error) => {
        this.httpErrorService.handle(error);
      }
    });
  }
}
