export interface DepartmentUserRequest {
  name: string;
  ssn: string;
  email: string;
  password: string;
  isDisabled: boolean;
  roles: string[];
}
