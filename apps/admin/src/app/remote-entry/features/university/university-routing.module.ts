import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityPageComponent } from './pages/university-page/university-page.component';
import { FacultyPageComponent } from './pages/faculty-page/faculty-page.component';

const routes: Routes = [
  {
    path: '',
    component: UniversityPageComponent,
  },
  {
    path: 'faculty',
    component: FacultyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversityRoutingModule {}
