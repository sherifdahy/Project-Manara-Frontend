import { createReducer, on } from "@ngrx/store";
import { initAuthState } from "../../states/auth/auth.state";
import { getTokenAction, getTokenFaildAction, getTokenSuccessAction } from "../../actions/auth/get-token.action";

export const authReducer = createReducer(initAuthState,
  on(getTokenAction, (state) => ({
    ...state,
    error: null
  })),

  on(getTokenSuccessAction, (state, { response }) => ({
    ...state,
    token: response.token,
    refreshToken: response.refreshToken,
    expiryIn: response.expiresIn,
  })),

  on(getTokenFaildAction, (state, { error }) => ({
    ...state,
    error
  }))
)
