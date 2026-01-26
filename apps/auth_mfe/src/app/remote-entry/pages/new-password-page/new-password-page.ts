import { Component, OnInit } from '@angular/core';
import { AppTranslateService } from '@project-manara-frontend/services';

@Component({
  selector: 'app-new-password-page',
  standalone: false,
  templateUrl: './new-password-page.html',
  styleUrl: './new-password-page.css',
})
export class NewPasswordPage implements OnInit {
  currentLanguage!: string;
  ngOnInit(): void {
    this.appTranslateService.language$.subscribe((response) => {
      this.currentLanguage = response;
    });
  }
  constructor(private appTranslateService: AppTranslateService) { }

  changeLanguage(lang: string) {
    this.appTranslateService.changeLanguage(lang);
  }
}
