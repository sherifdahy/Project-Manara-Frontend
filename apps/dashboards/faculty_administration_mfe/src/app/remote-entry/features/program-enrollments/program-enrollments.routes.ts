import { Routes } from '@angular/router';
import { ProgramEnrollmentsPageComponent } from './pages/program-enrollments-page/program-enrollments-page.component';
import { CreateProgramEnrollmentPageComponent } from './pages/create-program-enrollment-page/create-program-enrollment-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProgramEnrollmentsPageComponent,
  },
  {
    path: 'create',
    component: CreateProgramEnrollmentPageComponent,
  },
  // {
  //   path: ':id',
  //   component: ProgramDetailPageComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'overview',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'overview',
  //       component: ProgramOverviewPageComponent,
  //     },
  //     {
  //       path: 'settings',
  //       component: ProgramSettingsPageComponent,
  //     },
  //     {
  //       path: 'subjects',
  //       component: ProgramSubjectsPageComponent,
  //     },
  //     {
  //       path: 'schedule',
  //       component: ProgramSchedulePageComponent,
  //     },
  //     // {
  //     //   path: 'department-staffs',
  //     //   loadChildren: () =>
  //     //     import('../department-staffs/department-staffs.module').then(
  //     //       (x) => x.DepartmentStaffsModule,
  //     //     ),
  //     // },
  //     // {
  //     //   path: 'programs',
  //     //   loadChildren: () =>
  //     //     import('../programs/programs.module').then((x) => x.ProgramsModule),
  //     // },
  //   ],
  // },
];
