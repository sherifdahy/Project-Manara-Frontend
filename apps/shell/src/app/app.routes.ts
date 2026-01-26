import { Route } from '@angular/router';
import {
  AccessDeniedComponent,
  NotFoundComponent,
  ServerErrorComponent,
} from '@project-manara-frontend/ui';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./features/landing/landing.module').then((m) => m!.LandingModule),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('auth_mfe/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    loadChildren: () => import('./features/dashboard/dashboard.module').then(x => x.DashboardModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('admin/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: 'system_admin',
    loadChildren: () =>
      import('system_admin/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
