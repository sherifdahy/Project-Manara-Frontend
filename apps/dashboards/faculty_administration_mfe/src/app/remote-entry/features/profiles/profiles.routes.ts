import { Routes } from '@angular/router';
import { ProfileDetailsPageComponent } from './pages/profile-details-page/profile-details-page.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileDetailsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal-info',
        pathMatch: 'full',
      },
      {
        path: 'personal-info',
        component: PersonalInfoComponent,
      },
      {
        path: 'change-password',
        component: ChangePassComponent,
      },
    ],
  },
];
