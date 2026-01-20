import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { ApiClientService } from '../api/api-client.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthenticatedUserResponse, AuthResponse, ForgetPasswordRequest, LoginRequest, NewPasswordRequest } from '@project-manara-frontend/models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<AuthenticatedUserResponse | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private apiCall: ApiClientService, private authStorageService: AuthStorageService, private jwtService: JwtService) {
    {
      this.currentUserSubject = new BehaviorSubject<AuthenticatedUserResponse | null>(null);
      this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
      this.checkOnInit();
    }

  }

  checkOnInit() {
    this.authStorageService.getAuthData$().subscribe(response => {
      this.authStorageService.getAuthData$().subscribe((response) => {
        if (response) {
          this.currentUserSubject.next(this.jwtService.decodeToken(response?.token));
          this.isLoggedInSubject.next(true);
        } else {
          this.isLoggedInSubject.next(false);
        }
      });
    })
  }


  login(request: LoginRequest): Observable<AuthResponse> {
    return this.apiCall.post<AuthResponse>(`${environment.apiUrl}/api/authentications/login`, request).pipe(
      tap(response => {
        this.authStorageService.saveAuthData(response);
      }),
      tap((response) => {
        this.authStorageService.saveAuthData(response);
      })
    );
  }



  logout(): Observable<any> {
    return this.apiCall.post(`${environment.apiUrl}/api/authentications/revoke-refresh-token`, {
      token: this.authStorageService.getAuthData()?.token,
      refreshToken: this.authStorageService.getAuthData()?.refreshToken
    }).pipe((response) => {
      this.authStorageService.clearAuthData();
      return response;
    }
    )
  }

  forgetPassword(request: ForgetPasswordRequest): Observable<void> {
    return this.apiCall.post<void>(`${environment.apiUrl}/api/authentications/forget-password`, request);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.apiCall
      .post<AuthResponse>(`${environment.apiUrl}/api/authentications/refresh-token`, {
        token: this.authStorageService.getAuthData()?.token,
        refreshToken: this.authStorageService.getAuthData()?.refreshToken,
      })
      .pipe(
        tap((response) => {
          this.authStorageService.saveAuthData(response);
        })
      );
  }

  resetPassword(request: NewPasswordRequest): Observable<void> {
    return this.apiCall.post<void>(`${environment.apiUrl}/api/authentications/reset-password`, request);
  }

  get currentUser(): AuthenticatedUserResponse | null {
    return this.currentUserSubject.value;
  }

  get currentUser$(): Observable<AuthenticatedUserResponse | null> {
    return this.currentUserSubject.asObservable();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}






