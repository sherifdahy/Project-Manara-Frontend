export interface UniversityUserResponse {
  id: number
  name: string
  ssn: string
  email: string,
  phone: string,
  isDisabled: boolean
  isDeleted: boolean
  roles: string[]
}
