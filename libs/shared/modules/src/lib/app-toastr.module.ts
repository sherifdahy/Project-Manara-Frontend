// app-toastr.module.ts
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule()
export class AppToastrModule {

  static forRoot(): ModuleWithProviders<ToastrModule> {
    return ToastrModule.forRoot({
      positionClass : 'toast-top-center',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 5000,
      extendedTimeOut: 2000,
      closeButton: true,
      tapToDismiss: false,
      newestOnTop: true,
      easeTime: 300,
    });
  }
}
