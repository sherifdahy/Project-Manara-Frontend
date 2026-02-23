import { Routes } from "@angular/router";
import { StudentsPageComponent } from "./pages/students-page/students-page.component";
import { StudentFormPageComponent } from "./pages/student-form-page/student-form-page.component";

export const routes: Routes = [
  {
    path: '',
    component: StudentsPageComponent
  },
  {
    path: ':id',
    component: StudentFormPageComponent
  }
]
