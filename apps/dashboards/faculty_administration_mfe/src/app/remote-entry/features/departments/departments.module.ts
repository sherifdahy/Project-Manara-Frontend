import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './departments.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentFormDialogComponent } from './components/department-form-dialog/department-form-dialog.component';
import { UiModule } from '@project-manara-frontend/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    UiModule,
  ],
  declarations: [DepartmentsPageComponent, DepartmentFormDialogComponent],
})
export class DepartmentsModule {}
