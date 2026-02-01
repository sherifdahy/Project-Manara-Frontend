import { Routes } from "@angular/router";
import { RolesPageComponent } from "./pages/roles-page/roles-page.component";
import { RoleDetailPageComponent } from "./pages/role-detail-page/role-detail-page.component";

export const routes : Routes = [
  {
    path : '',
    component : RolesPageComponent
  },
  {
    path : ':id',
    component : RoleDetailPageComponent
  }
];
