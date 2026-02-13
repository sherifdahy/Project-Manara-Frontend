export interface ScopeResponse {
  id: number
  name: string
  isDeleted: boolean
  parentScopeId: number
  parentScopeName: any
  childScopesCount: number
  rolesCount: number
}
