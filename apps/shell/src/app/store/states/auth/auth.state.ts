export interface AuthState {
  token: string;
  expiryIn: number;
  refreshToken: string;
  error?: any
}


export let initAuthState: AuthState = {
  token: '',
  refreshToken: '',
  expiryIn: 0,
}
