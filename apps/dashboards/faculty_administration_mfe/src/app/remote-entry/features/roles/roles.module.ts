import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './roles.route';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { RoleFormPageComponent } from './pages/role-form-page/role-form-page.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '@project-manara-frontend/directives';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    DirectivesModule,
  ],
  declarations: [RolesPageComponent, RoleFormPageComponent],
})
export class RolesModule {}
