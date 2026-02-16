import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModule } from '@project-manara-frontend/ui'
import { remoteRoutes } from './entry.routes';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '@project-manara-frontend/services';
import { AppTranslateModule } from '@project-manara-frontend/modules';
import { DirectivesModule } from '@project-manara-frontend/directives'
import { UniversityOverviewPageComponent } from './pages/university-overview-page/university-overview-page.component';
import { StoreModule } from '@ngrx/store';
import { universityReducer } from './store/university/reducers/university.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UniversityEffects } from './store/university/effects/university.effects';
@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    UniversityOverviewPageComponent
  ],
  imports: [
    TranslateModule,
    UiModule,
    CommonModule,
    AppTranslateModule.forChild('/dashboards/university-administration/layout.json'),
    RouterModule.forChild(remoteRoutes),
    DirectivesModule,
    StoreModule.forFeature('university', universityReducer),
    EffectsModule.forFeature([UniversityEffects]),
  ],
  providers: [],
})
export class RemoteEntryModule {
  constructor(private translateService: TranslateService, private appTranslateService: AppTranslateService) {
    this.appTranslateService.language$.subscribe(lang => {
      this.translateService.getTranslation(lang).subscribe(file => {
        this.translateService.setTranslation(lang, file, true);
      });
    })
  }
}
