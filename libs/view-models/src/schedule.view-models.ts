import { DayResponse } from '@project-manara-frontend/models';
import { GridCell, GridItem } from './lib/drag-drop-grid.view-models';

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
}

export interface SlotCell extends GridCell<ScheduleEntry> {
  day: DayResponse;
  time: string;
}

export interface SchedulePageData {
  days: DayResponse[];
  subjects: SubjectItem[];
  periods: string[];
}

export interface ScheduleAssignment {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  dayId: number;
  dayName: string;
  time: string;
}