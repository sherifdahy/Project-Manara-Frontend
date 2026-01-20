import { Injectable } from '@angular/core';
import { AuthResponse } from '@project-manara-frontend/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private authDataSubject: BehaviorSubject<AuthResponse | null>;

  constructor() {
    this.authDataSubject = new BehaviorSubject<AuthResponse | null>(null);
    this.loadAuthDataFromStorage();
  }

  private loadAuthDataFromStorage(): void {
    const storedAuthData = localStorage.getItem('auth_data');
    if (storedAuthData) {
      try {
        const authData = JSON.parse(storedAuthData) as AuthResponse;
        this.authDataSubject.next(authData);
      } catch (error) {
        console.error('Failed to parse stored auth data:', error);
        this.clearAuthData();
      }
    }
  }

  saveAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(
      'auth_data',
      JSON.stringify(authResponse)
    );
    this.authDataSubject.next(authResponse);
  }

  clearAuthData(): void {
    localStorage.removeItem('auth_data');
    this.authDataSubject.next(null);
  }

  getAuthData$(): Observable<AuthResponse | null> {
    return this.authDataSubject.asObservable();
  }

  getAuthData(): AuthResponse | null {
    return this.authDataSubject.value;
  }

  isAuthenticated(): boolean {
    return this.authDataSubject.value !== null;
  }
}
