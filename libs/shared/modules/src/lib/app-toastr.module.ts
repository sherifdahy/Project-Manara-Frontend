import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr'

@NgModule()
export class AppToastrModule {

  static forRoot(): ModuleWithProviders<ToastrModule> {
    return ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true,
    });
  }
}
