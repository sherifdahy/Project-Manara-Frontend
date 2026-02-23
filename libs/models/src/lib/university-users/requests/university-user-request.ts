export interface UniversityUserRequest {
  name: string
  ssn: string
  email: string
  password: string
  isDisabled: boolean
  roles: string[]
}
