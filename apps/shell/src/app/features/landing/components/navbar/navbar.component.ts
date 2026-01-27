import { Component } from '@angular/core';
import { AppTranslateService, AuthService } from '@project-manara-frontend/services';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  acceptedLanguageConsts = AcceptedLanguageConsts;

  currentLanguage$: Observable<string>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private appTranslateService: AppTranslateService
  ) {
    this.currentLanguage$ = this.appTranslateService.language$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  changeLanguage(lang: string): void {
    this.appTranslateService.changeLanguage(lang);
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
