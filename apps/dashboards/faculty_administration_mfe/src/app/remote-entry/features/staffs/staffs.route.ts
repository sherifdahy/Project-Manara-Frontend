import { Routes } from "@angular/router";
import { StaffsPageComponent } from "./pages/staffs-page/staffs-page.component";
import { StaffDetailPageComponent } from "./pages/staff-detail-page/staff-detail-page.component";
import { StaffBasicInfoPageComponent } from "./pages/staff-basic-info-page/staff-basic-info-page.component";
import { StaffPermissionsPageComponent } from "./pages/staff-permissions-page/staff-permissions-page.component";
import { staffNameResolver } from "./resolvers/staff-name.resolver";

export const routes: Routes = [
  {
    path: '',
    component: StaffsPageComponent,
  },
  {
    path: ':id',
    component: StaffDetailPageComponent,
    resolve: { staffName: staffNameResolver },
    data: {
      breadcrumb: (data: any) => data.staffName
    },
    children: [
      {
        path: '',
        redirectTo: 'basic-info',
        pathMatch: 'full',
      },
      {
        path: 'basic-info',
        component: StaffBasicInfoPageComponent,
        data: { breadcrumb: 'Basic Info' },
      },
      {
        path: 'permissions',
        component: StaffPermissionsPageComponent,
        data: { breadcrumb: 'Permissions' },
      },
    ],
  },
];
