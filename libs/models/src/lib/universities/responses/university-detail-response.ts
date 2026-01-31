import { FacultyResponse } from "../../faculties/responses/faculty-response"

export interface UniversityDetailResponse {
  id: number
  name: string
  description: string
  address: string
  email: string
  website: string
  faculties: FacultyResponse[]
}
