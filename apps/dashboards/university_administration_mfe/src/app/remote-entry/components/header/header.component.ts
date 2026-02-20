import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, HttpErrorService, UniversityService, UserService } from '@project-manara-frontend/services';
import { AppTranslateService } from '@project-manara-frontend/services';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts';
import { catchError, EMPTY, empty, Observable, tap } from 'rxjs';
import { CurrentUserResponse, UniversityDetailResponse } from '@project-manara-frontend/models';
import { Store } from '@ngrx/store';
import { selectUniversityState } from '../../store/selectors/university.selectors';
import { getUniversityAction } from '../../store/actions/get-university.actions';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentLang: string = 'en';
  acceptedLanguageConsts = AcceptedLanguageConsts;
  currentUser!: CurrentUserResponse | null;
  universityState$ = this.store.select(selectUniversityState);
  constructor(
    private httpErrorService: HttpErrorService,
    private store: Store,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private appTranslateService: AppTranslateService,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(getUniversityAction());

    this.currentUser = this.userService.currentUser;

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

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.router.navigateByUrl('auth/login');
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        }
      });
  }
}

