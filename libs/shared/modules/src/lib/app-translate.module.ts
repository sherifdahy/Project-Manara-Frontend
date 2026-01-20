import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {  TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient, path: string) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, path);
}

@NgModule()
export class AppTranslateModule {

  static forRoot(): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot({
      defaultLanguage: 'en',
      extend : false,
      isolate: false,
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => createTranslateLoader(http, '/common.json'),
        deps: [HttpClient]
      }
    });
  }

  static forChild(path: string): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forChild({
      isolate: false,
      extend : true,
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => createTranslateLoader(http, path),
        deps: [HttpClient]
      }
    });
  }
}
