import { Routes } from '@angular/router';
import { SubjectsPageComponent } from './pages/subjects-page/subjects-page.component';
import { CreateSubjectPageComponent } from './pages/create-subject-page/create-subject-page.component';
import { SubjectDetailPageComponent } from './pages/subject-detail-page/subject-detail-page.component';
import { EditSubjectPageComponent } from './pages/edit-subject-page/edit-subject-page.component';

export const routes: Routes = [
  {
    path: '',
    component: SubjectsPageComponent,
  },
  {
    path: 'add',
    component: CreateSubjectPageComponent,
  },
  {
    path: ':id',
    component: SubjectDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'edit',
        pathMatch: 'full',
      },
      {
        path: 'edit',
        component: EditSubjectPageComponent,
      },
    ],
  },
];
