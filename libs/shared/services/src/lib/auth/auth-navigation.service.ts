import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from '@angular/router'
import { JwtService } from "./jwt.service";

@Injectable({ providedIn: 'root' })
export class AuthNavigationService {

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService
  ) { }

  redirect(returnUrl?: string | null) {

    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
      return;
    }

    const roles = this.authService.currentUser?.roles;

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

