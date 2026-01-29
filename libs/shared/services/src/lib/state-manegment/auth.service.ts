import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, Subject, tap } from 'rxjs';
import { ApiClientService } from '../api/api-client.service';
import { AuthResponse, ForgetPasswordRequest, LoginRequest, NewPasswordRequest } from '@project-manara-frontend/models';
import { environment } from 'environments/environment';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService  {

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);;

  constructor(private apiCall: ApiClientService, private authTokenService: AuthTokenService) {
    this.onInit();
  }

  private onInit() {
    this.authTokenService.authData$.subscribe((result) => {
      if (result)
        this.isAuthenticatedSubject.next(true);
      else
        this.isAuthenticatedSubject.next(false);
    });
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.apiCall.post<AuthResponse>(`${environment.apiUrl}/api/authentications/login`, request).pipe(
      tap((response: AuthResponse) => {
        this.authTokenService.save(response);
      })
    );
  }

  logout(): Observable<any> {
    return this.apiCall.post(`${environment.apiUrl}/api/authentications/revoke-refresh-token`, {
      token: this.authTokenService.authData?.token,
      refreshToken: this.authTokenService.authData?.refreshToken
    }).pipe(
      finalize(() => this.authTokenService.remove())
    );
  }

  forgetPassword(request: ForgetPasswordRequest): Observable<void> {
    return this.apiCall.post<void>(`${environment.apiUrl}/api/authentications/forget-password`, request);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.apiCall
      .post<AuthResponse>(`${environment.apiUrl}/api/authentications/refresh-token`, {
        token: this.authTokenService.authData?.token,
        refreshToken: this.authTokenService.authData?.refreshToken
      })
      .pipe(
        tap((response: AuthResponse) => {
          this.authTokenService.save(response);
        })
      );
  }

  resetPassword(request: NewPasswordRequest): Observable<void> {
    return this.apiCall.post<void>(`${environment.apiUrl}/api/authentications/reset-password`, request);
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}







