import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModule } from '@project-manara-frontend/ui'
import { remoteRoutes } from './entry.routes';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardPageComponent
  ],
  imports: [
    TranslateModule,
    UiModule,
    CommonModule,
    RouterModule.forChild(remoteRoutes)
  ],
  providers: [],
})
export class RemoteEntryModule { }
