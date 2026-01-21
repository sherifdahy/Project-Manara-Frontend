import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import { UniversityRoutingModule } from './university-routing.module';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { AppTranslateService } from '@project-manara-frontend/services';
import { UniversityPageComponent } from './pages/university-page/university-page.component';
import { FacultyPageComponent } from './pages/faculty-page/faculty-page.component';
import { FacultyDialogComponent } from './components/faculty-dialog/faculty-dialog.component';
import { FacultyEditComponent } from './components/faculty-edit/faculty-edit.component';
import { DialogComponent } from '@project-manara-frontend/ui';

@NgModule({
  declarations: [
    UniversityPageComponent,
    FacultyPageComponent,
    FacultyDialogComponent,
    FacultyEditComponent,
  ],
  imports: [
    CommonModule,
    UniversityRoutingModule,
    AppTranslateModule.forChild('/admin/university.json'),
    DialogComponent
  ],
})
export class UniversityModule {
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
