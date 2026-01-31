import { Route } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { guestGuard } from '@project-manara-frontend/guards'
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { NewPasswordPage } from './pages/new-password-page/new-password-page';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
export const remoteRoutes: Route[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [guestGuard],
      },
      {
        path: 'forget-password',
        component: ForgetPasswordPageComponent,
        canActivate: [guestGuard],
      },
      {
        path: 'new-password',
        component: NewPasswordPage,
        canActivate: [guestGuard],
        title: 'new password',
      },
    ]
  }
];
