import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DisplayErrorComponent } from './display-error/display-error.component';
import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [
    AccessDeniedComponent,
    DisplayErrorComponent,
    LanguageToggleComponent,
    NotFoundComponent,
    ServerErrorComponent,
    BreadcrumbComponent
  ],
  exports: [
    DisplayErrorComponent,
    AccessDeniedComponent,
    LanguageToggleComponent,
    NotFoundComponent,
    ServerErrorComponent,
    BreadcrumbComponent
  ]
})
export class UiModule { }
