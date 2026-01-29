import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
import { AccountService } from "./account.service";

@Injectable({ providedIn: 'root' })
export class AuthNavigationService {

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) { }

  redirect(returnUrl?: string | null) {

    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
      return;
    }

    const roles = this.accountService.currentUser?.roles;

    if (roles?.includes('system-admin')) {
      this.router.navigate(['system-admin']);
      return;
    }
    else {
      this.router.navigate(['dashboard']);
      return;
    }
  }

}

