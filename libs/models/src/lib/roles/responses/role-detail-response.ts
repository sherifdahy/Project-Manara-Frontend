export interface RoleDetailResponse {
  id: number;
  name: string;
  description: string;
  isDeleted: boolean;
  numberOfUsers: number;
  permissions: string[];
}
