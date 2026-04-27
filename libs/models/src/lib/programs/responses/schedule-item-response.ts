import { SubjectResponse } from '../../subjects/responses/subject-response';

export interface ScheduleItemResponse {
  subjectId: number;
  subjectName : string;
  periodId: number;
  dayId: number;
  doctorName : string;
  doctorId: number | null;
  instructorName : string;
  instructorId: number | null;
}
