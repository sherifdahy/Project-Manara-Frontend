import { Routes } from "@angular/router";
import { UniversitiesPageComponent } from "./pages/universities-page/universities-page.component";
import { UniversityDetailPageComponent } from "./pages/university-detail-page/university-detail-page.component";
import { UniversityOverviewPageComponent } from "./pages/university-overview-page/university-overview-page.component";
import { UniversitySettingPageComponent } from "./pages/university-setting-page/university-setting-page.component";

export const routes: Routes = [
  {
    path: '',
    component: UniversitiesPageComponent
  },
  {
    path: ':id',
    component: UniversityDetailPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: UniversityOverviewPageComponent
      },
      {
        path: 'faculties',
        loadChildren: () => import('../faculties/faculties.module').then(m => m.FacultiesModule)
      },
      {
        path: 'staffs',
        loadChildren: () => import('../staffs/staffs.module').then(m => m.StaffsModule)
      },
      {
        path: 'settings',
        component: UniversitySettingPageComponent
      }
    ]
  }
]
