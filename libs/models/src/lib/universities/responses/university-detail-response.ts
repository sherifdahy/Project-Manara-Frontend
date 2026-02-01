import { FacultyResponse } from "../../faculties/responses/faculty-response"

export interface UniversityDetailResponse {
  id: number
  name: string
  description: string
  address: string
  email: string
  website: string
  yearOfEstablishment: number
  numberOfStudents: number
  numberOfStuff: number
  numberOfFacilities: number
  faculties: FacultyResponse[]
}
