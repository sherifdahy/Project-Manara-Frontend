import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsPageComponent } from './pages/profile-details-page/profile-details-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './profiles.routes';
import { ProfileService } from '@project-manara-frontend/services';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [
    ProfileDetailsPageComponent,
    PersonalInfoComponent,
    ChangePassComponent,
  ],
  providers: [ProfileService],
})
export class ProfilesModule {}
