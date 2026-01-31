import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './has-permission.directive';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HasPermissionDirective
  ],
  exports: [
    HasPermissionDirective
  ]
})
export class DirectivesModule { }
