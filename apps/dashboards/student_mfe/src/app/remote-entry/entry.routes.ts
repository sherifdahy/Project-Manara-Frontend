import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/pages/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
    ],
  },
];
