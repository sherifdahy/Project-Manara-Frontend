import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthNavigationService, AuthService } from '@project-manara-frontend/services';

export const guestGuard: CanActivateFn = (route, state) => {

  const authNavigationService = inject(AuthNavigationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn)
    return true;

  authNavigationService.redirect();
  return false;
};
