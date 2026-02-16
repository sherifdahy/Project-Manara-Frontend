export interface FacultyRoleResponse {
  id: number
  name: string
  code: string
  description: string
  isDeleted: boolean
  defaultPermissions: string[]
  overridePermissions: string[]
}
