import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '@project-manara-frontend/services';

export const hasRoleGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const router = inject(Router);

  const data = route.data['required-role'] as string;

  if (accountService.currentUser?.roles.includes(data))
    return true;

  router.navigate(['access-denied'], { queryParams: { returnUrl: route.url } });
  return false;
};
