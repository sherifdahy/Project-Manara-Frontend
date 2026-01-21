import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { LayoutComponent } from './layouts/layout/layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '@project-manara-frontend/services';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AppTranslateModule,
    AppTranslateModule.forChild('/admin/layout.json'),
    RouterModule.forChild(remoteRoutes)],
  providers: [],
})
export class RemoteEntryModule {
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
