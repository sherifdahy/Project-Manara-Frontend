import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DirectivesModule } from '@project-manara-frontend/directives';
import { UiModule } from '@project-manara-frontend/ui';
import { routes } from './periods.route';
import { PeriodsPageComponent } from './pages/periods-page/periods-page.component';
import { PeriodFormDialogComponent } from './components/period-form-dialog/period-form-dialog.component';
import { PeriodDetailPageComponent } from './pages/period-detail-page/period-detail-page.component';
import { PeriodEditPageComponent } from './pages/period-edit-page/period-edit-page.component';
import { PeriodOverviewPageComponent } from './pages/period-overview-page/period-overview-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    UiModule,
    NgSelectModule,
    DirectivesModule,
  ],
  declarations: [
    PeriodsPageComponent,
    PeriodFormDialogComponent,
    PeriodDetailPageComponent,
    PeriodEditPageComponent,
    PeriodOverviewPageComponent,
  ],
})
export class PeriodsModule {}
