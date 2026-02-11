export interface RoleRequest {
  name: string;
  description: string;
  permissions: string[];
  isDeleted?: boolean;
}
