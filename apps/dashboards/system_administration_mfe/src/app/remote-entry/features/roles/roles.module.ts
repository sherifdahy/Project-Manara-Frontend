import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { RolesGrid } from './components/roles-grid/roles-grid';
import { RolesHeader } from './components/roles-header/roles-header';
import { RolesSearchBar } from './components/roles-search-bar/roles-search-bar';
import { RolesStatistics } from './components/roles-statistics/roles-statistics';
import { RouterModule } from '@angular/router';
import { routes } from './roles.route';
import { RoleDetailPageComponent } from './pages/role-detail-page/role-detail-page.component';
import { RoleFormPageComponent } from './pages/role-form-page/role-form-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [
    RolesPageComponent,
    RolesGrid,
    RolesHeader,
    RolesSearchBar,
    RolesStatistics,
    RoleDetailPageComponent,
    RoleFormPageComponent,
  ],
})
export class RolesModule {}
