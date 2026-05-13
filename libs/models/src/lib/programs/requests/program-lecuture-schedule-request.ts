export interface ProgramLectureScheduleRequest {
  subjectId: number;
  periodId: number;
  dayId: number;
  doctorId: number;
  maxSlots: number;
}
