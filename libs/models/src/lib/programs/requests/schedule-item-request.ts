export interface ScheduleItemRequest {
  subjectId: number;
  periodId: number;
  dayId: number;
  doctorId : number | null;
  instructorId : number | null;
}
