import { Routes } from '@angular/router';
import { PeriodsPageComponent } from './pages/periods-page/periods-page.component';
import { PeriodDetailPageComponent } from './pages/period-detail-page/period-detail-page.component';
import { PeriodOverviewPageComponent } from './pages/period-overview-page/period-overview-page.component';
import { PeriodEditPageComponent } from './pages/period-edit-page/period-edit-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PeriodsPageComponent,
  },
  {
    path: ':startTime/:endTime',
    component: PeriodDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: PeriodOverviewPageComponent,
      },
      {
        path: 'edit',
        component: PeriodEditPageComponent,
      },
    ],
  },
];
