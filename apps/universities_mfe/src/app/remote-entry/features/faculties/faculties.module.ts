import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDetailPageComponent } from './pages/faculty-detail-page/faculty-detail-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './faculties.routes';
import { FacultiesPageComponent } from './pages/faculties-page/faculties-page.component';
import { FacultyEditComponent } from './components/faculty-edit/faculty-edit.component';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { FacultyDialogComponent } from './components/faculty-dialog/faculty-dialog.component';
import { DialogComponent } from '@project-manara-frontend/ui';

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
    FacultyDialogComponent,
    FacultyEditComponent,
  ]
})
export class FacultiesModule {

}
