import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DisplayErrorComponent } from './display-error/display-error.component';
import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    AccessDeniedComponent,
    DisplayErrorComponent,
    LanguageToggleComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  exports: [
    DisplayErrorComponent,
    AccessDeniedComponent,
    LanguageToggleComponent,
    NotFoundComponent,
    ServerErrorComponent
  ]
})
export class UiModule { }
