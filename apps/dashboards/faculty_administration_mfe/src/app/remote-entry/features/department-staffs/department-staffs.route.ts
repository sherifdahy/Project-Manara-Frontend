import { Routes } from '@angular/router';
import { DepartmentStaffsPageComponent } from './pages/department-staffs-page/department-staffs-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DepartmentStaffsPageComponent,
  },
  // {
  //   path: ':id',
  //   component: StaffDetailPageComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'basic-info',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'basic-info',
  //       component: StaffBasicInfoPageComponent,
  //     },
  //     {
  //       path: 'permissions',
  //       component: StaffPermissionsPageComponent,
  //     },
  //   ],
  // },
];
