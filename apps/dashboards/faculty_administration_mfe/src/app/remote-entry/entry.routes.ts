import { Route } from '@angular/router';
import { FacultyOverviewComponent } from './pages/faculty-overview/faculty-overview.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: FacultyOverviewComponent,
      },
      {
        path: 'staffs',
        loadChildren: () =>
          import('./features/staffs/staffs.module').then(
            (x) => x.StaffsModule
          ),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./features/departments/departments.module').then(
            (x) => x.DepartmentsModule
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./features/roles/roles.module').then(
            (x) => x.RolesModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.module').then(
            (x) => x.ReportsModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then(
            (x) => x.SettingsModule
          ),
      },
    ],
  },
];
