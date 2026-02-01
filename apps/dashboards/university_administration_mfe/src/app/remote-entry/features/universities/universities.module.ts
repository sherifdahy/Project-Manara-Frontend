import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './university.routes';
import { UniversityDetailPageComponent } from './pages/university-detail-page/university-detail-page.component';
import { UiModule } from '@project-manara-frontend/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule,
    TranslateModule
  ],
  declarations: [
    UniversityDetailPageComponent
  ]
})
export class UniversitiesModule { }
