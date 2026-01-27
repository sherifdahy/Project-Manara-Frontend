import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@project-manara-frontend/services';
import { AppTranslateService } from '@project-manara-frontend/services';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentLang: string = 'en';
  acceptedLanguageConsts = AcceptedLanguageConsts;

  constructor(private router: Router, private authService: AuthService, private appTranslateService: AppTranslateService) { }

  ngOnInit() {
    this.appTranslateService.language$.subscribe((result) => {
      this.currentLang = result;
    });
  }

  changeLang(lang: string) {
    this.appTranslateService.changeLanguage(lang);
  }


  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/')
    })
  }
}
