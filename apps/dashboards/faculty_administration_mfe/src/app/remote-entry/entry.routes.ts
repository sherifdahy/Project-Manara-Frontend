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
          import('./features/staffs/staffs.module').then((x) => x.StaffsModule),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('./features/students/students.module').then(
            (x) => x.StudentsModule,
          ),
      },
      {
        path: 'subjects',
        loadChildren: () =>
          import('./features/subjects/subjects.module').then(
            (x) => x.SubjectsModule,
          ),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./features/departments/departments.module').then(
            (x) => x.DepartmentsModule,
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./features/roles/roles.module').then((x) => x.RolesModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.module').then(
            (x) => x.ReportsModule,
          ),
      },
      {
        path: 'years',
        loadChildren: () =>
          import('./features/years/years.module').then((x) => x.YearsModule),
      },
      {
        path: 'periods',
        loadChildren: () =>
          import('./features/periods/periods.module').then(
            (x) => x.PeriodsModule,
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then(
            (x) => x.SettingsModule,
          ),
      },
    ],
  },
];
