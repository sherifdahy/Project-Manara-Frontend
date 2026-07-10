export interface AvailableLectureResponse {
  lectureSchedulesId: number;
  remainingSlots: number;
  isCurrentEnrolled: boolean;
  subject: { id: number; name: string };
  doctor: { id: number; name: string };
  period: { id: number; startTime: string; endTime: string };
  day: { id: number; value: string };
}

export interface StudentLectureSelectionRequest {
  lectureScheduleId: number;
}

export interface StudentLectureSelectionResponse {
  lectureScheduleId: number;
  studentId: number;
  gpa: number;
}