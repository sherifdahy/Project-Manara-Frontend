import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  AuthService, UniversityService, UserService } from '@project-manara-frontend/services';
import { AppTranslateService } from '@project-manara-frontend/services';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts';
import { Observable } from 'rxjs';
import { CurrentUserResponse, UniversityDetailResponse } from '@project-manara-frontend/models';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentLang: string = 'en';
  acceptedLanguageConsts = AcceptedLanguageConsts;
  universityId!: number;
  university$!: Observable<UniversityDetailResponse>;
  currentUser!: CurrentUserResponse | null;

  constructor(
    private userService : UserService,
    private router: Router,
    private authService: AuthService,
    private universityService: UniversityService,
    private appTranslateService: AppTranslateService
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    // this.universityId = this.userService.currentUser?.universityId ?? 0;
    this.university$ = this.universityService.get(this.universityId);

    this.appTranslateService.language$.subscribe((result) => {
      this.currentLang = result;
    });
  }

  getInitials(name?: string): string {
    if (!name) return 'U';

    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  changeLang(lang: string) {
    this.appTranslateService.changeLanguage(lang);
  }

  logout() {
    this.authService.logout().subscribe(() => { });
    this.router.navigateByUrl('/');
  }
}
