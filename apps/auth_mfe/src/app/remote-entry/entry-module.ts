import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { ForgetPasswordFormComponent } from './components/forget-password-form/forget-password-form.component';
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NewPasswordForm } from './components/new-password-form/new-password-form';
import { NewPasswordPage } from './pages/new-password-page/new-password-page';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslateModule } from '@project-manara-frontend/modules'
import { UiModule } from '@project-manara-frontend/ui'
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '@project-manara-frontend/services';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


@NgModule({
  declarations: [
    ForgetPasswordFormComponent,
    ForgetPasswordPageComponent,
    LoginFormComponent,
    NewPasswordForm,
    NewPasswordPage,
    LoginPageComponent,
    NewPasswordPage,
    AuthLayoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(remoteRoutes),
    AppTranslateModule.forChild('/auth.json'),
    UiModule
  ],
  providers: [],
})
export class RemoteEntryModule {
  constructor(private translateService: TranslateService, private appTranslateService: AppTranslateService) {
    this.appTranslateService.language$.subscribe(lang => {
      this.translateService.getTranslation(lang).subscribe(file => {
        this.translateService.setTranslation(lang, file, true);
      });
    })
  }
}
