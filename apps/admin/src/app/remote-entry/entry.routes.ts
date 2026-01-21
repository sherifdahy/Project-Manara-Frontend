import { Route } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (x) => x.DashboardModule
          ),
      },
      {
        path: 'university',
        loadChildren: () =>
          import('./features/university/university.module').then(
            (x) => x.UniversityModule
          ),
      },
    ],
  },
];
