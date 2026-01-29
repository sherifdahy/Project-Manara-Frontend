import { Injectable } from '@angular/core';
import { LocalStorageConsts } from '@project-manara-frontend/consts';
import { AuthResponse } from '@project-manara-frontend/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  private readonly authDataSubject = new BehaviorSubject<AuthResponse | null>(this.onInit());

  private onInit(): AuthResponse | null {
    let auth_data_string = localStorage.getItem(LocalStorageConsts.auth_data);
    if (!auth_data_string)
      return null;

    let auth_data = JSON.parse(auth_data_string!) as AuthResponse;
    if (!auth_data)
      return null;

    return auth_data;
  }

  get authData(): AuthResponse | null {
    return this.authDataSubject.value;
  }

  get authData$(): Observable<AuthResponse | null> {
    return this.authDataSubject.asObservable();
  }

  save(authResponse: AuthResponse): void {
    localStorage.setItem(LocalStorageConsts.auth_data, JSON.stringify(authResponse));
    this.authDataSubject.next(authResponse);
  }

  remove(): void {
    localStorage.removeItem(LocalStorageConsts.auth_data);
    this.authDataSubject.next(null);
  }
}
