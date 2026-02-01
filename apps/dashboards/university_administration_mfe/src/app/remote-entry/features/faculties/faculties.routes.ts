import { Routes } from "@angular/router";
import { FacultyDetailPageComponent } from "./pages/faculty-detail-page/faculty-detail-page.component";
import { FacultiesPageComponent } from "./pages/faculties-page/faculties-page.component";

export const routes: Routes = [
  {
    path: '',
    component: FacultiesPageComponent
  },
  {
    path: ':id',
    component: FacultyDetailPageComponent
  }
];
