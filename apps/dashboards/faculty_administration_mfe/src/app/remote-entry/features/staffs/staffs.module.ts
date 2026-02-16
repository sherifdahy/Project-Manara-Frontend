import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffsPageComponent } from './pages/staffs-page/staffs-page.component';
import { StaffDetailPageComponent } from './pages/staff-detail-page/staff-detail-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './staffs.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { StaffFormDialogComponent } from './components/staff-form-dialog/staff-form-dialog.component';
import { UiModule } from '@project-manara-frontend/ui';
import { StaffBasicInfoPageComponent } from './pages/staff-basic-info-page/staff-basic-info-page.component';
import { StaffPermissionsPageComponent } from './pages/staff-permissions-page/staff-permissions-page.component';
import { NgSelectModule } from '@ng-select/ng-select'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    UiModule,
    NgSelectModule
  ],
  declarations: [
    StaffsPageComponent,
    StaffDetailPageComponent,
    StaffFormDialogComponent,
    StaffBasicInfoPageComponent,
    StaffPermissionsPageComponent
  ]
})
export class StaffsModule { }
