import { Routes } from '@angular/router';
import { ProgramsPageComponent } from './pages/programs-page/programs-page.component';
import { ProgramDetailPageComponent } from './pages/program-detail-page/program-detail-page.component';
import { ProgramOverviewPageComponent } from './pages/program-overview-page/program-overview-page.component';
import { ProgramSettingsPageComponent } from './pages/program-settings-page/program-settings-page.component';

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
      // {
      //   path: 'department-staffs',
      //   loadChildren: () =>
      //     import('../department-staffs/department-staffs.module').then(
      //       (x) => x.DepartmentStaffsModule,
      //     ),
      // },
      // {
      //   path: 'programs',
      //   loadChildren: () =>
      //     import('../programs/programs.module').then((x) => x.ProgramsModule),
      // },
    ],
  },
];
