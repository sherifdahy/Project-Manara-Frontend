import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { UniversityDetailPageComponent } from './pages/university-detail-page/university-detail-page.component';
import { AppTranslateModule } from '@project-manara-frontend/modules'
import { DialogComponent } from '@project-manara-frontend/ui'
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '@project-manara-frontend/services'

@NgModule({
  declarations: [
    UniversityDetailPageComponent,

  ],
  imports: [
    CommonModule,
    AppTranslateModule.forChild('/admin/university.json'),
    DialogComponent,
    RouterModule.forChild(remoteRoutes)
  ],
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
