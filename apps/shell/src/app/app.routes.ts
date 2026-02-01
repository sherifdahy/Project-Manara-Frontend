import { Route } from '@angular/router';
import { guestGuard, hasRoleGuard } from '@project-manara-frontend/guards';
import { RoleConsts } from '@project-manara-frontend/consts';
import { AccessDeniedComponent } from 'libs/ui/src/lib/access-denied/access-denied.component';
import { ServerErrorComponent } from 'libs/ui/src/lib/server-error/server-error.component';
import { NotFoundComponent } from 'libs/ui/src/lib/not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: 'student_mfe',
    loadChildren: () =>
      import('student_mfe/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/landing/landing.module').then((m) => m!.LandingModule),
  },
  {
    path: 'auth',
    canMatch: [guestGuard],
    loadChildren: () =>
      import('auth_mfe/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: 'system-administration',
    // canMatch: [hasRoleGuard],
    data: { 'required-roles': [RoleConsts.systemAdmin] },
    loadChildren: () =>
      import('system_administration_mfe/Module').then(
        (m) => m!.RemoteEntryModule,
      ),
  },
  {
    path: 'university-administration',
    // canMatch: [hasRoleGuard],
    data: { 'required-roles': [RoleConsts.universityAdmin] },
    loadChildren: () =>
      import('university_administration_mfe/Module').then(
        (m) => m!.RemoteEntryModule,
      ),
  },
  {
    path: 'faculty-administration',
    // canMatch: [hasRoleGuard],
    data: {
      'required-roles': [
        RoleConsts.facultyAdmin,
        RoleConsts.examinationOfficer,
        RoleConsts.programCoordinator,
        RoleConsts.academicAdvisor,
      ],
    },
    loadChildren: () =>
      import('faculty_administration_mfe/Module').then(
        (m) => m!.RemoteEntryModule,
      ),
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
