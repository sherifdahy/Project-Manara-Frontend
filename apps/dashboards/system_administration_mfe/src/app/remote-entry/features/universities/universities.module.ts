import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversitiesPageComponent } from './pages/universities-page/universities-page.component';
import { UniversityDetailPageComponent } from './pages/university-detail-page/university-detail-page.component';
import { UniversityFormDialogComponent } from './components/university-form-dialog/university-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { FacultyCardComponent } from './components/faculty-card/faculty-card.component';
import { FacultyFormDialogComponent } from './components/faculty-form-dialog/faculty-form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@project-manara-frontend/ui';
import { RouterModule } from '@angular/router';
import { routes } from './universities.route';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    UiModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UniversitiesPageComponent,
    UniversityDetailPageComponent,
    UniversityFormDialogComponent,
    FacultyCardComponent,
    FacultyFormDialogComponent,

  ]
})
export class UniversitiesModule { }
