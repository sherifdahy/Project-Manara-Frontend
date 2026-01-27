import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr'

@NgModule()
export class AppToastrModule {

  static forRoot(): ModuleWithProviders<ToastrModule> {
    return ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      progressBar: true,
      timeOut: 5000,
      toastClass: 'ngx-toastr custom-toast',
    })
  }
}
