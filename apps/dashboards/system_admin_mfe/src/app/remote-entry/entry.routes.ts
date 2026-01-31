import { Route } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'roles',
        loadChildren: () => import('./features/roles/roles.module').then(x => x.RolesModule)
      },
      {
        path: 'universities',
        loadChildren: () => import('./features/universities/universities.module').then(x => x.UniversitiesModule)
      }
    ]
  }
];
