import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffsPageComponent } from './pages/staffs-page/staffs-page.component';
import { StaffFormPageComponent } from './pages/staff-form-page/staff-form-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './staffs.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { StaffFormDialogComponent } from './components/staff-form-dialog/staff-form-dialog.component';
import { UiModule } from '@project-manara-frontend/ui';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    UiModule
  ],
  declarations: [
    StaffsPageComponent,
    StaffFormPageComponent,
    StaffFormDialogComponent
  ]
})
export class StaffsModule { }
