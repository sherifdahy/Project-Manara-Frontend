import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './departments.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentFormDialogComponent } from './components/department-form-dialog/department-form-dialog.component';
import { UiModule } from '@project-manara-frontend/ui';
import { DepartmentDetailPageComponent } from './pages/department-detail-page/department-detail-page.component';
import { DepartmentOverviewPageComponent } from './pages/department-overview-page/department-overview-page.component';
import { DirectivesModule } from '@project-manara-frontend/directives';
import { DepartmentSettingsPageComponent } from './pages/department-settings-page/department-settings-page.component';

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
    DepartmentsPageComponent,
    DepartmentFormDialogComponent,
    DepartmentDetailPageComponent,
    DepartmentOverviewPageComponent,
    DepartmentSettingsPageComponent,
  ],
})
export class DepartmentsModule {}
