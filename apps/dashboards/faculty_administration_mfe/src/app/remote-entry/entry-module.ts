import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@project-manara-frontend/ui'
@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardPageComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    UiModule,
    RouterModule.forChild(remoteRoutes)
  ],
  providers: [],
})
export class RemoteEntryModule {}
