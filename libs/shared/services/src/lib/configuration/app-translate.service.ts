import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService {

  private languageSubject = new BehaviorSubject<string>(
    this.getInitialLanguage()
  );

  language$ = this.languageSubject.asObservable();

  constructor(private translateService: TranslateService) {
    this.initialize();
  }

  changeLanguage(lang: string): void {
    if (lang === this.languageSubject.value) return;

    this.setDirection(lang);
    this.translateService.use(lang);
    this.languageSubject.next(lang);

    localStorage.setItem('app_language', lang);
  }

  get currentLanguage(): string {
    return this.languageSubject.value;
  }

  private initialize(): void {
    const lang = this.languageSubject.value;

    this.translateService.setDefaultLang(AcceptedLanguageConsts.english);
    this.translateService.use(lang);
    this.setDirection(lang);
  }

  private getInitialLanguage(): string {
    return (
      localStorage.getItem('app_language') || AcceptedLanguageConsts.english
    );
  }

  private setDirection(lang: string): void {
    const isArabic = lang === AcceptedLanguageConsts.arabic;

    // Set direction
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

    // Set language attribute
    document.documentElement.lang = lang;

    // Optional: Add/remove class for additional styling
    document.body.classList.toggle('rtl', isArabic);
    document.body.classList.toggle('ltr', !isArabic);
  }
}
