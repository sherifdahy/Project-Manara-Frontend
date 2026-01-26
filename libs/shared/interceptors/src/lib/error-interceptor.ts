import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@project-manara-frontend/services';
import { AuthResponse } from '@project-manara-frontend/models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {

          if (req.url.includes('refresh-token')) {
            this.authService.logout();
            this.router.navigate(['auth/login']);
            return throwError(() => error);
          }

          if (!this.isRefreshing && this.authService.isLoggedIn) {
            this.isRefreshing = true;

            return this.authService.refreshToken().pipe(
              switchMap((authResponse: AuthResponse) => {
                this.isRefreshing = false;

                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${authResponse.token}`
                  }
                });

                return next.handle(newReq);
              }),
              catchError(err => {
                this.isRefreshing = false;
                this.authService.logout();
                this.router.navigate(['auth/login']);
                return throwError(() => err);
              })
            );
          }
        }

        // باقي الـ status codes
        switch (error.status) {
          case 403:
            this.router.navigate(['/access-denied']);
            break;
          case 404:
            this.router.navigate(['/not-found']);
            break;
          case 500:
          case 502:
          case 503:
            this.router.navigate(['/server-error']);
            break;
        }

        return throwError(() => error);
      })
    );
  }
};
