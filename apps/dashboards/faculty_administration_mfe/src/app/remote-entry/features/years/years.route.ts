import { Routes } from '@angular/router';
import { YearsPageComponent } from './pages/years-page/years-page.component';
import { YearDetailPageComponent } from './pages/year-detail-page/year-detail-page.component';
import { YearOverviewPageComponent } from './pages/year-overview-page/year-overview-page.component';
import { YearEditPageComponent } from './pages/year-edit-page/year-edit-page.component';

export const routes: Routes = [
  {
    path: '',
    component: YearsPageComponent,
  },
  {
    path: ':id',
    component: YearDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: YearOverviewPageComponent,
      },
      {
        path: 'edit',
        component: YearEditPageComponent,
      },
    ],
  },
];
