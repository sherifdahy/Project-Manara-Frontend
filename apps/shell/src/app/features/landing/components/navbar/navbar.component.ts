import { Component, OnInit } from '@angular/core';
import { AppTranslateService, AuthService, NotificationService } from '@project-manara-frontend/services';

@Component({
  selector: 'app-navbar',
  standalone : false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentLanguage! : string;
  isLoggedIn!: boolean;

  constructor(
    private authService: AuthService,
    private appTranslateService: AppTranslateService,
    private errorHandlerService : NotificationService
  ) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(response => {
      this.isLoggedIn = response;
    });

    this.appTranslateService.language$.subscribe(response=>{
      this.currentLanguage = response;
    })
  }

  logout() {
    this.authService.logout().subscribe({
      error: (errors) => {
        this.errorHandlerService.handleError(errors,'');
      }
    });
  }

  changeLanguage(lang:string)
  {
    this.appTranslateService.changeLanguage(lang);
  }
}
