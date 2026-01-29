import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService} from '@project-manara-frontend/services';

export const hasPermissionGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  const data = route.data['required-permission'] as string;

  if (accountService.currentUser?.permissions.includes(data))
    return true;

  router.navigate(['access-denied'], { queryParams: { returnUrl: route.url } });
  return false;
};
