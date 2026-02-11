import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@project-manara-frontend/services';

export const hasRoleGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  const requiredRoles = route.data['required-roles'] as string[];
  const userRoles = userService.currentUser?.roles;

  const hasAccess = requiredRoles.some(role=> userRoles?.includes(role));

  if(hasAccess)
    return true;

  router.navigate(['access-denied'], { queryParams: { returnUrl: route.url } });
  return false;
};
