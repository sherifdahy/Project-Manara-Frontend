import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { remoteRoutes } from './entry.routes';
import { FacultyOverviewComponent } from './pages/faculty-overview/faculty-overview.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@project-manara-frontend/ui'

@NgModule({
  declarations: [
    FacultyOverviewComponent,
    HeaderComponent, SidebarComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    TranslateModule,
    UiModule
  ],
  providers: [],
})
export class RemoteEntryModule { }
