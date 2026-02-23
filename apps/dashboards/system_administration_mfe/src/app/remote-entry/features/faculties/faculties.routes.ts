import { Routes } from "@angular/router";
import { FacultyDetailPageComponent } from "./pages/faculty-detail-page/faculty-detail-page.component";
import { FacultiesPageComponent } from "./pages/faculties-page/faculties-page.component";
import { FacultyOverviewPageComponent } from "./pages/faculty-overview-page/faculty-overview-page.component";
import { FacultySettingsPageComponent } from "./pages/faculty-settings-page/faculty-settings-page.component";

export const routes: Routes = [
  {
    path: '',
    component: FacultiesPageComponent
  },
  {
    path: ':id',
    component: FacultyDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: FacultyOverviewPageComponent
      },
      {
        path: 'settings',
        component: FacultySettingsPageComponent
      },
    ]
  }
];
