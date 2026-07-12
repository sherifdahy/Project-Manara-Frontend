import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { RoleConsts } from '@project-manara-frontend/consts';

@Injectable({ providedIn: 'root' })
export class AuthNavigationService {
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  redirect(returnUrl?: string | null) {
    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
      return;
    }

    const roles = this.userService.currentUser?.roles;

    if (roles?.includes(RoleConsts.systemAdmin)) {
      this.router.navigateByUrl('/system-administration');
    } else if (roles?.includes(RoleConsts.universityAdmin)) {
      this.router.navigateByUrl('/university-administration');
    } else if (
      roles?.includes(RoleConsts.facultyAdmin) ||
      roles?.includes(RoleConsts.facultyCoordinator) ||
      roles?.includes(RoleConsts.academicAdvisor) ||
      roles?.includes(RoleConsts.departmentHead) ||
      roles?.includes(RoleConsts.doctor) ||
      roles?.includes(RoleConsts.instructor)
    ) {
      this.router.navigateByUrl('/faculty-administration');
    } else if (
      roles?.includes(RoleConsts.student) ||
      roles?.includes(RoleConsts.mainStreamStudent)
    ) {
      this.router.navigateByUrl('/student');
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
