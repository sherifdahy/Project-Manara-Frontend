import { Routes } from '@angular/router';
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { DepartmentDetailPageComponent } from './pages/department-detail-page/department-detail-page.component';
import { DepartmentOverviewPageComponent } from './pages/department-overview-page/department-overview-page.component';
import { DepartmentSettingsPageComponent } from './pages/department-settings-page/department-settings-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DepartmentsPageComponent,
  },
  {
    path: ':id',
    component: DepartmentDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: DepartmentOverviewPageComponent,
      },
      {
        path: 'settings',
        component: DepartmentSettingsPageComponent,
      },
    ],
  },
];
