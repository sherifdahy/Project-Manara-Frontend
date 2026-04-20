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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProgramSchedulePageComponent } from './pages/program-schedule-page/program-schedule-page.component';
import { SubjectsPoolComponent } from './components/subjects-pool/subjects-pool.component';
import { ScheduleGridComponent } from './components/schedule-grid/schedule-grid.component';
import { ScheduleHeaderComponent } from './components/schedule-header/schedule-header.component';
import { SlotDetailDialogComponent } from './components/slot-detail-dialog/slot-detail-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DirectivesModule,
    DragDropModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
    ProgramFormDialogComponent,
    ProgramDetailPageComponent,
    ProgramOverviewPageComponent,
    ProgramSettingsPageComponent,
    ProgramsPageComponent,
    ProgramSubjectsPageComponent,
    ProgramSchedulePageComponent,
    SubjectsPoolComponent,
    ScheduleGridComponent,
    ScheduleHeaderComponent,
    SlotDetailDialogComponent,
  ],
})
export class ProgramsModule {}
