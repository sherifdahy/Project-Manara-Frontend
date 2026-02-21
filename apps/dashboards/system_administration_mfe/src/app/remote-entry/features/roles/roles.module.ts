import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './roles.route';
import { RoleFormPageComponent } from './pages/role-form-page/role-form-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [
    RolesPageComponent,
    RoleFormPageComponent,
  ],
})
export class RolesModule { }
