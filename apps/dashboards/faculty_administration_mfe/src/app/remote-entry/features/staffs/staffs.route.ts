import { Routes } from "@angular/router";
import { StaffsPageComponent } from "./pages/staffs-page/staffs-page.component";
import { StaffFormPageComponent } from "./pages/staff-form-page/staff-form-page.component";

export const routes: Routes = [
  {
    path: '',
    component: StaffsPageComponent,
  },
  {
    path: ':id',
    component: StaffFormPageComponent
  }
]
