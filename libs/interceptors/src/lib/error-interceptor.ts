import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError,Observable, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, ToastService } from '@project-manara-frontend/services';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // ========================
        // 401 Unauthorized
        // ========================
        if (error.status === 401) {

          // لو الريفريش نفسه رجّع 401
          if (req.url.includes('refresh')) {
            this.forceLogout();
            this.toast.warning('Your session has expired. Please login again.', 'Session Expired');
            return throwError(() => error);
          }

          // مفيش token أصلاً
          if (!this.authService.isAuthenticated) {
            this.forceLogout();
            this.toast.warning('You are not authenticated. Please login.', 'Unauthorized');
            return throwError(() => error);
          }

          // refresh مرة واحدة فقط
          if (!this.isRefreshing) {
            this.isRefreshing = true;

            return this.authService.refreshToken().pipe(
              switchMap(auth => {
                this.isRefreshing = false;

                const cloned = req.clone({
                  setHeaders: { Authorization: `Bearer ${auth.token}` }
                });

                return next.handle(cloned);
              }),
              catchError(err => {
                this.isRefreshing = false;
                this.forceLogout();
                this.toast.warning('Your session has expired. Please login again.', 'Session Expired');
                return throwError(() => err);
              })
            );
          }
        }

        // ========================
        // Navigation + Toast Errors
        // ========================
        this.handleNavigation(error);

        // إرسال الرسالة للـ component لو حابب
        const message = error?.error?.message || error.statusText || 'An unexpected error occurred';
        return throwError(() => ({ ...error, message }));
      })
    );
  }

  private forceLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  private handleNavigation(error: HttpErrorResponse): void {
    switch (error.status) {
      case 403:
        this.toast.error('You do not have permission to access this resource.', 'Access Denied');
        this.router.navigate(['/access-denied']);
        break;

      case 404:
        this.toast.error('Requested resource not found.', 'Not Found');
        this.router.navigate(['/not-found']);
        break;

      case 500:
      case 502:
      case 503:
        this.toast.error('Server error. Please try again later.', 'Server Error');
        this.router.navigate(['/server-error']);
        break;
    }
  }
}

