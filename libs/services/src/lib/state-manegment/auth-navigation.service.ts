import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
import { UserService } from "./user.service";
import { RoleConsts } from "@project-manara-frontend/consts";

@Injectable({ providedIn: 'root' })
export class AuthNavigationService {

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  redirect(returnUrl?: string | null) {

    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
      return;
    }

    const roles = this.userService.currentUser?.roles;

    if (roles?.includes(RoleConsts.systemAdmin)) {
      this.router.navigateByUrl('/system-administration');
    }
    else if (roles?.includes(RoleConsts.universityAdmin)) {
      this.router.navigateByUrl('/university-administration');
    }
    else if (roles?.includes(RoleConsts.facultyAdmin)) {
      this.router.navigateByUrl('/faculty-administration');
    }
    else {
      this.router.navigateByUrl('/');
    }
  }
}

