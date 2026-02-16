import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@project-manara-frontend/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { ForgetPasswordFormComponent } from './components/forget-password-form/forget-password-form.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTranslateModule.forChild('/auth.json'),
    TranslateModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AuthLayoutComponent,
    LoginFormComponent,
    ForgetPasswordFormComponent,
    ResetPasswordFormComponent,
  ]
})
export class AuthModule { }
