import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getTokenAction, getTokenFaildAction, getTokenSuccessAction } from "../../actions/auth/get-token.action";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { AuthResponse } from "@project-manara-frontend/models";

@Injectable({
  providedIn: 'root'
})
export class AuthEffect {
  getToken$;
  constructor(private actions$: Actions, private httpClient: HttpClient) {
    this.getToken$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(getTokenAction),
        switchMap(({ email, password }) => {
          return this.httpClient.post<AuthResponse>(`${environment.apiUrl}/api/authentications/login`, { email, password }).pipe(
            map(response => getTokenSuccessAction({ response })),
            catchError(error => of(getTokenFaildAction({ error }))),
          )
        })
      )
    })
  }
}
