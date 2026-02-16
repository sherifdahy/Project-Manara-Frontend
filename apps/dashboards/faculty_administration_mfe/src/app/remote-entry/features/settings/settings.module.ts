import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@project-manara-frontend/ui';
import { RouterModule } from '@angular/router';
import { routes } from './settings.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SettingsPageComponent
  ]
})
export class SettingsModule { }
