export interface NewPasswordRequest {
  code: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
}
