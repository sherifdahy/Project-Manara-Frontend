import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDetailPageComponent } from './pages/faculty-detail-page/faculty-detail-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './faculties.routes';
import { FacultiesPageComponent } from './pages/faculties-page/faculties-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultyOverviewPageComponent } from './pages/faculty-overview-page/faculty-overview-page.component';
import { UiModule } from '@project-manara-frontend/ui';
import { TranslateModule } from '@ngx-translate/core';
import { FacultyFormDialogComponent } from './components/faculty-form-dialog/faculty-form-dialog.component';
import { FacultySettingsPageComponent } from './pages/faculty-settings-page/faculty-settings-page.component';
import { DirectivesModule } from "@project-manara-frontend/directives";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule
],
  declarations: [
    FacultiesPageComponent,
    FacultyDetailPageComponent,
    FacultyOverviewPageComponent,
    FacultyFormDialogComponent,
    FacultySettingsPageComponent
  ],
})
export class FacultiesModule {
}
