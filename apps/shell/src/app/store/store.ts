import { ActionReducerMap } from "@ngrx/store";
import { AuthState } from "./states/auth/auth.state";
import { authReducer } from "./reducers/auth/auth.reducer";
import { AuthEffect } from "./effects/auth/auth.effect";

export interface AppState {
  auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
}

export const effects = [AuthEffect]
