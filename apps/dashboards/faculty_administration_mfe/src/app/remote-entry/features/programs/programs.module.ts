import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@project-manara-frontend/ui';
import { DirectivesModule } from '@project-manara-frontend/directives';
import { routes } from './programs.routes';
import { ProgramFormDialogComponent } from './components/program-form-dialog/program-form-dialog.component';
import { ProgramDetailPageComponent } from './pages/program-detail-page/program-detail-page.component';
import { ProgramOverviewPageComponent } from './pages/program-overview-page/program-overview-page.component';
import { ProgramSettingsPageComponent } from './pages/program-settings-page/program-settings-page.component';
import { ProgramsPageComponent } from './pages/programs-page/programs-page.component';
import { ProgramSubjectsPageComponent } from './pages/program-subjects-page/program-subjects-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DirectivesModule,
  ],
  declarations: [
    ProgramFormDialogComponent,
    ProgramDetailPageComponent,
    ProgramOverviewPageComponent,
    ProgramSettingsPageComponent,
    ProgramsPageComponent,
    ProgramSubjectsPageComponent
  ],
})
export class ProgramsModule {}
