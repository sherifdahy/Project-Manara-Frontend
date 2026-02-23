import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@project-manara-frontend/ui';
import { RouterModule } from '@angular/router';
import { routes } from './settings.route';
import { UniversitySettingPageComponent } from './pages/university-setting-page/university-setting-page.component';
import { DirectivesModule } from '@project-manara-frontend/directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    UiModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UniversitySettingPageComponent],
})
export class SettingsModule { }
