import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDetailPageComponent } from './pages/faculty-detail-page/faculty-detail-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './faculties.routes';
import { FacultiesPageComponent } from './pages/faculties-page/faculties-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultyOverviewPageComponent } from './pages/faculty-overview-page/faculty-overview-page.component';
import { StatisticsOverview } from './components/statistics-overview/statistics-overview';
import { DashboardDetails } from './components/dashboard-details/dashboard-details';
import { UiModule } from '@project-manara-frontend/ui';
import { TranslateModule } from '@ngx-translate/core';
import { FacultyFormDialogComponent } from './components/faculty-form-dialog/faculty-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    FacultiesPageComponent,
    FacultyDetailPageComponent,
    FacultyOverviewPageComponent,
    StatisticsOverview,
    DashboardDetails,
    FacultyFormDialogComponent
  ],
})
export class FacultiesModule {
}
