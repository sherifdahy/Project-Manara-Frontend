import { Routes } from "@angular/router";
import { UniversitiesPageComponent } from "./pages/universities-page/universities-page.component";
import { UniversityDetailPageComponent } from "./pages/university-detail-page/university-detail-page.component";

export const routes : Routes = [
  {
    path : '',
    component : UniversitiesPageComponent
  },
  {
    path : ':id',
    component : UniversityDetailPageComponent,
    children : [

    ]
  }
]
