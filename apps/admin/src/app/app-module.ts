import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '@project-manara-frontend/services';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppTranslateModule.forChild('/admin/layout.json'),

    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./remote-entry/entry-module').then(
              (m) => m.RemoteEntryModule,
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' },
    ),
  ],
  providers: [],
  bootstrap: [App],
})
export class AppModule {

}
