import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { remoteRoutes } from './entry.routes';
import { FacultyOverviewComponent } from './pages/faculty-overview/faculty-overview.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@project-manara-frontend/ui'
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { FacultyEffect } from './store/effects/faculty.effect';
import { facultyReducer } from './store/reducers/faculty-reducer';
import { FacultyUserEffect } from './store/effects/faculty-user.effect';
import { facultyUserReducer } from './store/reducers/faculty-user.reducer';
import { getFacultyAction } from './store/actions/get-faculty.actions';
import { getFacultyUserAction } from './store/actions/get-faculty-user.actions';
import { DirectivesModule } from '@project-manara-frontend/directives';
@NgModule({
  declarations: [
    FacultyOverviewComponent,
    HeaderComponent, SidebarComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    TranslateModule,
    UiModule,
    DirectivesModule,
    EffectsModule.forFeature([FacultyEffect, FacultyUserEffect]),
    StoreModule.forFeature('faculty', facultyReducer),
    StoreModule.forFeature('facultyUser', facultyUserReducer),
  ],
  providers: [],
})
export class RemoteEntryModule {
  constructor(private store: Store) {
    this.store.dispatch(getFacultyAction());
    this.store.dispatch(getFacultyUserAction());
  }
}
