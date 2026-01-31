import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { RolesGrid } from './components/roles-grid/roles-grid';
import { RolesHeader } from './components/roles-header/roles-header';
import { RolesSearchBar } from './components/roles-search-bar/roles-search-bar';
import { RolesStatistics } from './components/roles-statistics/roles-statistics';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';

@NgModule({
  declarations: [
    RolesGrid,
    RolesHeader,
    RolesSearchBar,
    RolesStatistics,
    RolesPageComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes)],
  providers: [],
})
export class RemoteEntryModule {}
