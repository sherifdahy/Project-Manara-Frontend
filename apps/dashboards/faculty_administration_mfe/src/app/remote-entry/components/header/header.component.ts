import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, FacultyService, HttpErrorService, UniversityService, UserService } from '@project-manara-frontend/services';
import { AppTranslateService } from '@project-manara-frontend/services';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts';
import { Observable } from 'rxjs';
import { CurrentUserResponse, FacultyDetailResponse, UniversityDetailResponse } from '@project-manara-frontend/models';
import { Store } from '@ngrx/store';
import { selectFaculty } from '../../../store/faculty/selectors/faculty.selectors';
import { getFacultyAction } from '../../../store/faculty/actions/get-faculty.actions';
import { HttpErrorResponse } from '@angular/common/http';

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
  faculty$ = this.store.select(selectFaculty);
  constructor(
    private httpErrorService : HttpErrorService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private appTranslateService: AppTranslateService,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(getFacultyAction());
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

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/auth/login');
      },
      error: (error) => {
        this.httpErrorService.handle(error);
      }
    });
  }
}
