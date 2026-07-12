import { Routes } from '@angular/router';
import { PeriodsPageComponent } from './pages/periods-page/periods-page.component';
import { PeriodDetailPageComponent } from './pages/period-detail-page/period-detail-page.component';
import { PeriodEditPageComponent } from './pages/period-edit-page/period-edit-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PeriodsPageComponent,
  },
  {
    path: ':periodId',
    component: PeriodDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'edit',
        pathMatch: 'full',
      },
      {
        path: 'edit',
        component: PeriodEditPageComponent,
      },
    ],
  },
];
