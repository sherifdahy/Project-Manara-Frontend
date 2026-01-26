import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordRequest } from '@project-manara-frontend/models';
import { AuthService, NotificationService } from '@project-manara-frontend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password-form',
  standalone: false,
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.css'],
})
export class ForgetPasswordFormComponent implements OnInit {
  successMessage: boolean = false;
  form!: FormGroup;
  @ViewChild('errorMessage') errorMessageRef!: ElementRef<HTMLDivElement>;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private errorHandler: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request = this.form.value as ForgetPasswordRequest;
    this.callEndPoint(request);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }
  private callEndPoint(request: ForgetPasswordRequest) {
    this.authService.forgetPassword(request).subscribe({
      next: () => this.submitSuccess(),
      error: (errors: any) => this.submitFail(errors),
    });
  }

  private submitSuccess() {
    this.toastrService.success('Email Send Successfully');
    this.successMessage = true;
    this.cdr.detectChanges();
  }
  private submitFail(errors: any) {
    this.errorHandler.handleError(errors, 'User.InvalidCredentials', this.errorMessageRef);
  }

  get email(): any {
    return this.form.get('email');
  }
}
