export interface RoleDetailResponse {
  id: number;
  name: string;
  code: string;
  description: string;
  isDeleted: boolean;
  numberOfUsers: number;
  permissions: string[];
}
