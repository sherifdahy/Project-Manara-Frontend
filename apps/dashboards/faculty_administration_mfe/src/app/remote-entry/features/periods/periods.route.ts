import { Routes } from '@angular/router';
import { PeriodsPageComponent } from './pages/periods-page/periods-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PeriodsPageComponent,
  },
  // {
  //   path: ':id',
  //   component: YearDetailPageComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'overview',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'overview',
  //       component: YearOverviewPageComponent,
  //     },
  //     {
  //       path: 'edit',
  //       component: YearEditPageComponent,
  //     },
  //   ],
  // },
];
