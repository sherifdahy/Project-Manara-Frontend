import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@project-manara-frontend/directives';
import { UiModule } from '@project-manara-frontend/ui';
import { routes } from './program-enrollments.routes';
import { RouterModule } from '@angular/router';
import { ProgramEnrollmentsPageComponent } from './pages/program-enrollments-page/program-enrollments-page.component';
import { CreateProgramEnrollmentPageComponent } from './pages/create-program-enrollment-page/create-program-enrollment-page.component';

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
    ProgramEnrollmentsPageComponent,
    CreateProgramEnrollmentPageComponent,
  ],
})
export class ProgramEnrollmentsModule {}
