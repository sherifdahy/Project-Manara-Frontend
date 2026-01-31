import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts'
import { AppTranslateService } from '@project-manara-frontend/services'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-language-toggle',
  standalone: false,
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.css'],
})
export class LanguageToggleComponent implements OnInit {

  acceptedLanguageConsts = AcceptedLanguageConsts;
  currentLanguage$!: Observable<string>;

  constructor(private translateService: AppTranslateService) { }

  ngOnInit() {
    this.currentLanguage$ = this.translateService.language$;
  }

  changeLanguage(lang: string) {
    this.translateService.changeLanguage(lang);
  }
}
