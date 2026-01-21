import { Route } from '@angular/router';
import { AccessDeniedComponent, NotFoundComponent, ServerErrorComponent } from '@project-manara-frontend/ui';

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
