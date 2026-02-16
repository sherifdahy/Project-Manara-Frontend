import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/store';
import { getTokenAction } from './store/actions/auth/get-token.action';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'shell';

  constructor(private store: Store<AppState>) {
    store.dispatch(getTokenAction({ email: 'faculty-admin@manara.org', password: '333Manara%' }));
  }
}
