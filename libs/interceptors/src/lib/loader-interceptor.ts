import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoaderService } from "@project-manara-frontend/services";
import { delay, finalize, Observable } from "rxjs";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.loading();
    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide()
      })
    );
  }
};
