export interface AuthResponse {
  id : number;
  email : string;
  firstName : string;
  lastName : string;
  token: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiration : Date;
}
