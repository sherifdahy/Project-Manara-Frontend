import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./features/landing/landing.module').then((m) => m!.LandingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m!.AuthModule),
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
  }
];
