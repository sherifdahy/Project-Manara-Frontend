import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { ForgetPasswordFormComponent } from "./components/forget-password-form/forget-password-form.component";
import { ResetPasswordFormComponent } from "./components/reset-password-form/reset-password-form.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'forget-password',
        component: ForgetPasswordFormComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent
      }
    ]
  }
]
