import { Routes } from '@angular/router';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { RoleDetailPageComponent } from './pages/role-detail-page/role-detail-page.component';
import { RoleFormPageComponent } from './pages/role-form-page/role-form-page.component';

export const routes: Routes = [
  {
    path: '',
    component: RolesPageComponent,
  },
  {
    path: 'create-role',
    component: RoleFormPageComponent,
  },
  {
    path: 'edit-role/:id',
    component: RoleFormPageComponent,
  },
  {
    path: ':id',
    component: RoleDetailPageComponent,
  },
];
