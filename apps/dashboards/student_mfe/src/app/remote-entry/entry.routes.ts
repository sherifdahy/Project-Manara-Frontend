import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

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
        loadComponent: () =>
          import('./features/landing/pages/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'academic-progress',
        loadComponent: () =>
          import(
            './features/academic-progress/academic-progress.component'
          ).then((x) => x.AcademicProgressComponent),
      },
      {
        path: 'course-registration',
        loadComponent: () =>
          import(
            './features/course-registration/course-registration.component'
          ).then((x) => x.CourseRegistrationComponent),
      },
    ],
  },
];
