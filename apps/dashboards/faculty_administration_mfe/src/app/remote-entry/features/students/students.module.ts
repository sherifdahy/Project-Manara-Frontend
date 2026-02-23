import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { StudentFormPageComponent } from './pages/student-form-page/student-form-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './students.route';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    StudentsPageComponent,
    StudentFormPageComponent
  ]
})
export class StudentsModule { }
