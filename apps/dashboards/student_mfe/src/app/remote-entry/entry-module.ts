import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './layout/main-layout/components/sidebar/sidebar.component';
import { HeaderComponent } from './layout/main-layout/components/header/header.component';
import { UiModule } from '@project-manara-frontend/ui';
@NgModule({
  declarations: [MainLayoutComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), UiModule],
  providers: [],
})
export class RemoteEntryModule {}
