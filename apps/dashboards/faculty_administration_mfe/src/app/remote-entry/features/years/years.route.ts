import { Routes } from '@angular/router';
import { YearsPageComponent } from './pages/years-page/years-page.component';

export const routes: Routes = [
  {
    path: '',
    component: YearsPageComponent,
  },
  // {
  //   path: 'add',
  //   component: CreateSubjectPageComponent,
  // },
  // {
  //   path: ':id',
  //   component: SubjectDetailPageComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'overview',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'overview',
  //       component: SubjectOverviewPageComponent,
  //     },
  //     {
  //       path: 'edit',
  //       component: EditSubjectPageComponent,
  //     },
  //   ],
  // },
];
