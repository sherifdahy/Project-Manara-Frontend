import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageService } from '@project-manara-frontend/services';
import { AcceptedLanguageConsts } from '@project-manara-frontend/consts';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authStorageService: AuthStorageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authStorageService.getAuthData()?.token;
    const currentLang = localStorage.getItem('app_language') ?? AcceptedLanguageConsts.english;

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}`, 'Accept-Language': currentLang } })
      : req;

    return next.handle(authReq);
  }
}
