import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './students.route';
import { UiModule } from '@project-manara-frontend/ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { StudentDetailPageComponent } from './pages/student-detail-page/student-detail-page.component';
import { StudentOverviewComponent } from './pages/student-overview/student-overview.component';
import { CreateStudentPageComponent } from './pages/create-student-page/create-student-page.component';
import { EditStudentPageComponent } from './pages/edit-student-page/edit-student-page.component';
import { StudentPermissionsPageComponent } from './pages/student-permissions-page/student-permissions-page.component';
import { StudentEnrollmentPageComponent } from './pages/student-enrollment-page/student-enrollment-page.component';
import { DirectivesModule } from '@project-manara-frontend/directives';

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
    StudentsPageComponent,
    CreateStudentPageComponent,
    EditStudentPageComponent,
    StudentDetailPageComponent,
    StudentOverviewComponent,
    StudentPermissionsPageComponent,
    StudentEnrollmentPageComponent,
  ],
})
export class StudentsModule {}
