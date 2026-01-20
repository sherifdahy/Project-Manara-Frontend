import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'system_admin',
    loadChildren: () =>
      import('system_admin/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
