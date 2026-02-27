import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DirectivesModule } from '@project-manara-frontend/directives';
import { UiModule } from '@project-manara-frontend/ui';
import { DepartmentStaffsPageComponent } from './pages/department-staffs-page/department-staffs-page.component';
import { routes } from './department-staffs.route';
import { DepartmentStaffFormDialogComponent } from './components/department-staff-form-dialog/department-staff-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    UiModule,
    NgSelectModule,
    DirectivesModule,
  ],
  declarations: [
    DepartmentStaffsPageComponent,
    DepartmentStaffFormDialogComponent,
  ],
})
export class DepartmentStaffsModule {}
