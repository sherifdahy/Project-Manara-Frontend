import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';

@NgModule({
  declarations: [
    RolesPageComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes)],
  providers: [],
})
export class RemoteEntryModule {}
