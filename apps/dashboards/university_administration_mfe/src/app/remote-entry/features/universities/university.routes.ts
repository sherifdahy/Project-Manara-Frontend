import { Routes } from "@angular/router";
import { UniversityDetailPageComponent } from "./pages/university-detail-page/university-detail-page.component";

export const routes: Routes = [
  {
    path: ':id',
    component: UniversityDetailPageComponent,
  },
]
