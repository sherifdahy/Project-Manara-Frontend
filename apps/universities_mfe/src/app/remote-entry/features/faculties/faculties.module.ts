import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDetailPageComponent } from './pages/faculty-detail-page/faculty-detail-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './faculties.routes';
import { FacultiesPageComponent } from './pages/faculties-page/faculties-page.component';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { DialogComponent } from '@project-manara-frontend/ui';
import { FacultyFormDialogComponent } from './components/faculty-form-dialog/faculty-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTranslateModule.forChild(''),
    DialogComponent,
  ],
  declarations: [
    FacultyDetailPageComponent,
    FacultiesPageComponent,
    FacultyFormDialogComponent,
  ]
})
export class FacultiesModule {

}
