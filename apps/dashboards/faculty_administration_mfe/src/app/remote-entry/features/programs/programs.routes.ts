import { Routes } from '@angular/router';
import { ProgramsPageComponent } from './pages/programs-page/programs-page.component';
import { ProgramDetailPageComponent } from './pages/program-detail-page/program-detail-page.component';
import { ProgramOverviewPageComponent } from './pages/program-overview-page/program-overview-page.component';
import { ProgramSettingsPageComponent } from './pages/program-settings-page/program-settings-page.component';
import { ProgramSubjectsPageComponent } from './pages/program-subjects-page/program-subjects-page.component';
import { ProgramSchedulePageComponent } from './pages/program-schedule-page/program-schedule-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProgramsPageComponent,
  },
  {
    path: ':id',
    component: ProgramDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: ProgramOverviewPageComponent,
      },
      {
        path: 'settings',
        component: ProgramSettingsPageComponent,
      },
      {
        path: 'subjects',
        component: ProgramSubjectsPageComponent,
      },
      {
        path: 'schedule',
        component: ProgramSchedulePageComponent,
      },
      // {
      //   path: 'department-staffs',
      //   loadChildren: () =>
      //     import('../department-staffs/department-staffs.module').then(
      //       (x) => x.DepartmentStaffsModule,
      //     ),
      // },
      {
        path: 'program-enrollments',
        loadChildren: () =>
          import('../program-enrollments/program-enrollments.module').then(
            (x) => x.ProgramEnrollmentsModule,
          ),
      },
    ],
  },
];
