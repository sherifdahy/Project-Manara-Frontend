import { SubjectResponse } from './subject-response';

export interface SubjectDetailResponse {
  id: number;
  name: string;
  code: string;
  description: string;
  creditHours: number;
  isDeleted: boolean;
  prerequisites: SubjectResponse[];
}
