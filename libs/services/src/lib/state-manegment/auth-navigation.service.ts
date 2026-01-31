import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
import { AccountService } from "./account.service";
import { RoleConsts } from "@project-manara-frontend/consts";

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

    if (roles?.length == 1) {
      switch (roles[0]) {
        case (RoleConsts.systemAdmin):
          this.router.navigateByUrl('/system-administration');
          break;
        case (RoleConsts.universityAdmin):
          this.router.navigateByUrl('/university-administration');
          break;
        case (RoleConsts.facultyAdmin):
        case (RoleConsts.academicAdvisor):
        case (RoleConsts.examinationOfficer):
        case (RoleConsts.programCoordinator):
          this.router.navigateByUrl('/faculty-administration');
          break;
        case (RoleConsts.doctor):
        case (RoleConsts.instructor):
          this.router.navigateByUrl('/staff');
          break;
        case (RoleConsts.student):
          this.router.navigateByUrl('/student');
          break;

      }
    }
    else {
      // select one of dashboards
    }
  }

}

