import { Route } from '@angular/router';
import { UniversityDetailPageComponent } from './pages/university-detail-page/university-detail-page.component';
import { UniversitiesPageComponent } from './pages/universities-page/universities-page.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: UniversitiesPageComponent
  },
  {
    path: ':id',
    component: UniversityDetailPageComponent
  },
  {
    path: ':id/faculties',
    loadChildren: () => import('./features/faculties/faculties.module').then(x => x.FacultiesModule)
  },

];
