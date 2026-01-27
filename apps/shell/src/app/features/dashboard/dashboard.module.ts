import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '@project-manara-frontend/services';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routes';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LanguageToggleComponent } from '@project-manara-frontend/ui';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    AppTranslateModule.forChild('/admin/layout.json'),
    LanguageToggleComponent
  ],
  declarations: [
    DashboardLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardPageComponent
  ]
})
export class DashboardModule {
  constructor(
    private translateService: TranslateService,
    private appTranslateService: AppTranslateService
  ) {
    this.appTranslateService.language$.subscribe((lang) => {
      this.translateService.getTranslation(lang).subscribe((file) => {
        this.translateService.setTranslation(lang, file, true);
      });
    });
  }
}
