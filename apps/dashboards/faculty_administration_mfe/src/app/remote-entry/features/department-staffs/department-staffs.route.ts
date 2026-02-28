import { Routes } from '@angular/router';
import { DepartmentStaffsPageComponent } from './pages/department-staffs-page/department-staffs-page.component';
import { DepartmentStaffDetailPageComponent } from './pages/department-staff-detail-page/department-staff-detail-page.component';
import { DepartmentStaffBasicInfoPageComponent } from './pages/department-staff-basic-info-page/department-staff-basic-info-page.component';
import { DepartmentStaffPermissionsPageComponent } from './pages/department-staff-permissions-page/department-staff-permissions-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DepartmentStaffsPageComponent,
  },
  {
    path: ':id',
    component: DepartmentStaffDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-info',
        pathMatch: 'full',
      },
      {
        path: 'basic-info',
        component: DepartmentStaffBasicInfoPageComponent,
      },
      {
        path: 'permissions',
        component: DepartmentStaffPermissionsPageComponent,
      },
    ],
  },
];
