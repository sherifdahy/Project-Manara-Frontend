export interface StudentLecture {
  lectureScheduleId: number | null;
  subject: Subject;
  gpa: number | null;
  status: LectureStatus;
}

export interface Subject {
  id: number;
  name: string;
  creditHours: number;
}

export type LectureStatus = 'Available' | 'Locked' | 'Completed' | 'InProgress';
