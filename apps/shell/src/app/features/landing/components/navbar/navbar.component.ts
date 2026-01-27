import { Component, OnInit } from '@angular/core';
import { AppTranslateService, AuthService } from '@project-manara-frontend/services';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentLanguage!: string;
  isLoggedIn!: boolean;
  acceptedLanguageConsts = AcceptedLanguageConsts;
  constructor(
    private authService: AuthService,
    private appTranslateService: AppTranslateService,
  ) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(response => {
      this.isLoggedIn = response;
    });

    this.appTranslateService.language$.subscribe(response => {
      this.currentLanguage = response;
    })
  }

  logout() {
    this.authService.logout().subscribe();
  }

  changeLanguage(lang: string) {
    this.appTranslateService.changeLanguage(lang);
  }
}
