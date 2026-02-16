import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffsPageComponent } from './pages/staffs-page/staffs-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './staffs.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    StaffsPageComponent,
  ]
})
export class StaffsModule { }
