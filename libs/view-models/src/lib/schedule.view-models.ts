// models/schedule.models.ts

import { DayResponse } from '@project-manara-frontend/models';
import { GridCell, GridItem } from './drag-drop-grid.view-models';

export interface SubjectItem {
  id: number;
  name: string;
  code: string;
  creditHours: number;
}

export interface ScheduleEntry extends GridItem {
  uid: string;
  subjectId: number;
  name: string;
  code: string;
  creditHours: number;
  doctorId?: number | null;
  doctorName?: string | null;
  instructorId?: number | null;    // ← اتغير من assistantId
  instructorName?: string | null;  // ← اتغير من assistantName
}

export interface SlotCell extends GridCell<ScheduleEntry> {
  day: DayResponse;
  time: string;
  periodId: number;
}

export interface SchedulePageData {
  days: DayResponse[];
  subjects: SubjectItem[];
  periods: PeriodItem[];
}

export interface PeriodItem {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
}

export interface ScheduleAssignment {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  dayId: number;
  dayName: string;
  periodId: number;
  time: string;
  doctorId: number | null;
  instructorId: number | null;  // ← اتغير
}

export interface StaffMember {
  id: number;
  name: string;
}

export interface SlotDialogData {
  entry: ScheduleEntry;
  day: DayResponse;
  time: string;
  doctors: StaffMember[];
  instructors: StaffMember[];              // ← اتغير من assistants
  selectedDoctorId: number | null;
  selectedInstructorId: number | null;     // ← اتغير من selectedAssistantId
}

export interface SlotDialogResult {
  doctorId: number | null;
  instructorId: number | null;             // ← اتغير من assistantId
}