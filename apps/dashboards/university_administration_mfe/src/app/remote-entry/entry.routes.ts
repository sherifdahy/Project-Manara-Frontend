import { Route } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UniversityOverviewPageComponent } from './pages/university-overview-page/university-overview-page.component';

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
        component: UniversityOverviewPageComponent,
      },
      {
        path: 'faculties',
        loadChildren: () =>
          import('./features/faculties/faculties.module').then(
            (x) => x.FacultiesModule,
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
