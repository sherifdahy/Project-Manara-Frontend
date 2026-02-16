import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { AuthResponse } from "@project-manara-frontend/models";

export const getTokenAction = createAction(
  '[Auth] Get Token',
  props<{ email: string, password: string }>()
)

export const getTokenSuccessAction = createAction(
  '[Auth] Get Token Success',
  props<{ response: AuthResponse }>(),
)

export const getTokenFaildAction = createAction(
  '[Auth] Get Token Faild',
  props<{ error: HttpErrorResponse }>()
)
