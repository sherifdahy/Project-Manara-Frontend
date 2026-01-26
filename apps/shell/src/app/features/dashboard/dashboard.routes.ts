import { Routes } from "@angular/router";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent
  },
  {
    path: 'universities',
    loadChildren: () =>
      import('universities_mfe/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('roles_mfe/Module').then((m) => m!.RemoteEntryModule),
  },
];
