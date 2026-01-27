import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, HttpErrorService, ToastService } from '@project-manara-frontend/services';
import { AuthResponse } from '@project-manara-frontend/models';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  private silentUrls = ['refresh-token', 'check-auth', 'login', 'register'];
  private skipRefreshUrls = ['refresh-token', 'login', 'register', 'forgot-password'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private httpError: HttpErrorService,
    private dialog : MatDialog
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const isSilent = this.silentUrls.some(url => req.url.includes(url));
        const skipRefresh = this.skipRefreshUrls.some(url => req.url.includes(url));

        if (error.status === 401 && !skipRefresh) {
          return this.handle401Error(req, next);
        }

        if (!isSilent) {
          this.httpError.handle(error);
        }

        this.handleNavigation(error);

        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      if (!this.authService.isLoggedIn) {
        this.isRefreshing = false;
        this.redirectToLogin();
        return throwError(() => new Error('Not authenticated'));
      }

      return this.authService.refreshToken().pipe(
        switchMap((authResponse: AuthResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(authResponse.token);
          return next.handle(this.addToken(req, authResponse.token));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(null);
          this.handleRefreshError();
          return throwError(() => err);
        })
      );
    }

    return this.refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addToken(req, token)))
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handleRefreshError(): void {
    this.dialog.closeAll();
    this.authService.logout();
    this.toast.warning('Session expired. Please login again.', 'Session Expired');
  this.redirectToLogin();
  }

  private redirectToLogin(): void {
    const currentUrl = this.router.url;
    if (currentUrl && !currentUrl.includes('auth')) {
      sessionStorage.setItem('redirectUrl', currentUrl);
    }
    this.router.navigate(['/auth/login']);
  }

  private handleNavigation(error: HttpErrorResponse): void {
    switch (error.status) {
      case 403:
        this.router.navigate(['/access-denied']);
        break;
      case 500:
      case 502:
      case 503:
        this.router.navigate(['/server-error']);
        break;
    }
  }
}
