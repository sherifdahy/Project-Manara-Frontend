import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TechPartnersComponent } from './components/tech-partners/tech-partners.component';
import { TrustedPartnersComponent } from './components/trusted-partners/trusted-partners.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '@project-manara-frontend/services';
import { FormsModule } from '@angular/forms';
import { LanguageToggleComponent } from '@project-manara-frontend/ui';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AppTranslateModule.forChild('/landing.json'),
    LanguageToggleComponent
  ],
  declarations: [
    // layouts
    LandingLayoutComponent,

    // pages
    HomeComponent,

    // components
    HeaderComponent,
    NavbarComponent,
    TechPartnersComponent,
    TrustedPartnersComponent,
    PricingComponent,
    FooterComponent,
  ]
})
export class LandingModule {
  constructor(private translateService: TranslateService, private appTranslateService: AppTranslateService) {
      this.appTranslateService.language$.subscribe(lang => {
        this.translateService.getTranslation(lang).subscribe(file => {
          this.translateService.setTranslation(lang, file, true);
        });
      })
    }
}
