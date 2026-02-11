import { Injectable } from '@angular/core';
import { CurrentUserResponse } from '@project-manara-frontend/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private currentUserSubject!: BehaviorSubject<CurrentUserResponse | null>;

  constructor(private authTokenService: AuthTokenService) {
    this.currentUserSubject = new BehaviorSubject<CurrentUserResponse | null>(null);
    this.onInit();
  }

  private onInit() {
    this.authTokenService.authData$.subscribe((result) => {
      if (!result) {
        this.currentUserSubject.next(null);
        return;
      }
      this.currentUserSubject.next(this.decodeToken(result.token));
    });
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  }

  get currentUser(): CurrentUserResponse | null {
    return this.currentUserSubject.value;
  }

  get currentUser$(): Observable<CurrentUserResponse | null> {
    return this.currentUserSubject.asObservable();
  }

}
