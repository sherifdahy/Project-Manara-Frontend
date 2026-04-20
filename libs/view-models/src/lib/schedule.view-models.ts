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
  assistantId?: number | null;
  assistantName?: string | null;
}

export interface SlotCell extends GridCell<ScheduleEntry> {
  day: DayResponse;
  time: string;
  periodId: number;  // ← جديد
}

export interface SchedulePageData {
  days: DayResponse[];
  subjects: SubjectItem[];
  periods: PeriodItem[];  // ← اتغير
}

// ← جديد
export interface PeriodItem {
  id: number;
  label: string;       // "08:00 - 09:30"
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
  assistantId: number | null;
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
  assistants: StaffMember[];
  selectedDoctorId: number | null;
  selectedAssistantId: number | null;
}

export interface SlotDialogResult {
  doctorId: number | null;
  assistantId: number | null;
}