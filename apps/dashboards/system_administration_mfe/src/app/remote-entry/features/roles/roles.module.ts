import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { RolesGrid } from './components/roles-grid/roles-grid';
import { RolesHeader } from './components/roles-header/roles-header';
import { RolesStatistics } from './components/roles-statistics/roles-statistics';
import { RouterModule } from '@angular/router';
import { routes } from './roles.route';
import { RoleFormPageComponent } from './pages/role-form-page/role-form-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [
    RolesPageComponent,
    RolesGrid,
    RolesHeader,
    RolesStatistics,
    RoleFormPageComponent,
  ],
})
export class RolesModule {}
