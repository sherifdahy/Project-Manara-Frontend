import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcceptedLanguageConsts, LocalStorageConsts } from '@project-manara-frontend/consts';
import { AuthTokenService } from '@project-manara-frontend/services';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authTokenService: AuthTokenService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authTokenService.authData?.token;
    const currentLang = localStorage.getItem(LocalStorageConsts.app_language) ?? AcceptedLanguageConsts.english;

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}`, 'Accept-Language': currentLang } })
      : req;

    return next.handle(authReq);
  }
}
