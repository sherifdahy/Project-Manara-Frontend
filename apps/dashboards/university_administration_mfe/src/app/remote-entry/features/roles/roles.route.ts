import { Routes } from "@angular/router";
import { RolesPageComponent } from "./pages/roles-page/roles-page.component";
import { RoleFormPageComponent } from "./pages/role-form-page/role-form-page.component";

export const routes: Routes = [
  {
    path: '',
    component: RolesPageComponent
  },
  {
    path: ':id',
    component: RoleFormPageComponent
  }
];
