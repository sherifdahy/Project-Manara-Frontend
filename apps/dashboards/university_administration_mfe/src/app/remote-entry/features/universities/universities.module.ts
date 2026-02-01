import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './university.routes';
import { UniversityDetailPageComponent } from './pages/university-detail-page/university-detail-page.component';
import { UiModule } from '@project-manara-frontend/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FacultyCardComponent } from './components/faculty-card/faculty-card.component';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { AppTranslateService } from '@project-manara-frontend/services';
import { FacultyFormDialogComponent } from './components/faculty-form-dialog/faculty-form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from "@project-manara-frontend/directives";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTranslateModule.forChild('/dashboards/university-administration/university.json'),
    UiModule,
    TranslateModule,
    ReactiveFormsModule,
    DirectivesModule
],
  declarations: [
    UniversityDetailPageComponent,
    FacultyCardComponent,
    FacultyFormDialogComponent
  ]
})
export class UniversitiesModule {
  constructor(private translateService: TranslateService, private appTranslateService: AppTranslateService) {
    this.appTranslateService.language$.subscribe(lang => {
      this.translateService.getTranslation(lang).subscribe(file => {
        this.translateService.setTranslation(lang, file, true);
      });
    })
  }
}
