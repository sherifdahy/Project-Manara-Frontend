import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DirectivesModule } from '@project-manara-frontend/directives';
import { UiModule } from '@project-manara-frontend/ui';
import { routes } from './years.route';
import { RouterModule } from '@angular/router';
import { YearsPageComponent } from './pages/years-page/years-page.component';
import { YearFormDialogComponent } from './components/year-form-dialog/year-form-dialog.component';
import { YearOverviewPageComponent } from './pages/year-overview-page/year-overview-page.component';
import { YearEditPageComponent } from './pages/year-edit-page/year-edit-page.component';
import { YearDetailPageComponent } from './pages/year-detail-page/year-detail-page.component';

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
    YearsPageComponent,
    YearFormDialogComponent,
    YearOverviewPageComponent,
    YearEditPageComponent,
    YearDetailPageComponent,
  ],
})
export class YearsModule {}
