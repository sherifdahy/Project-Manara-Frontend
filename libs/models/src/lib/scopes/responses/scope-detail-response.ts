import { RoleResponse } from "../../roles/responses/role-response"
import { ScopeResponse } from "./scope-response"

export interface ScopeDetailResponse {
  id: number
  name: string
  isDeleted: boolean
  parentScopeId: number
  parentScope: ScopeResponse
  childScopes: ScopeResponse[]
  roles: RoleResponse[]
}


