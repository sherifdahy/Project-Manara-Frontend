import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../api/api-client.service';
import { environment } from 'environments/environment';
import {
  ProgramLectureScheduleRequest,
  ProgramLectureScheduleResponse,
  ProgramSectionScheduleRequest,
  ProgramSectionScheduleResponse,
} from '@project-manara-frontend/models';

@Injectable({ providedIn: 'root' })
export class ProgramScheduleService {
  constructor(private apiClient: ApiClientService) {}

  getLecturesSchedule(
    programId: number,
  ): Observable<ProgramLectureScheduleResponse[]> {
    return this.apiClient.get<ProgramLectureScheduleResponse[]>(
      `${environment.apiUrl}/api/programs/${programId}/lectures-schedule`,
    );
  }

  saveLecturesSchedule(
    programId: number,
    request: ProgramLectureScheduleRequest[],
  ): Observable<void> {
    return this.apiClient.post<void>(
      `${environment.apiUrl}/api/programs/${programId}/lectures-schedule`,
      { schedules: request },
    );
  }

  getSectionsSchedule(
    programId: number,
  ): Observable<ProgramSectionScheduleResponse[]> {
    return this.apiClient.get<ProgramSectionScheduleResponse[]>(
      `${environment.apiUrl}/api/programs/${programId}/sections-schedule`,
    );
  }

  saveSectionsSchedule(
    programId: number,
    request: ProgramSectionScheduleRequest[],
  ): Observable<void> {
    return this.apiClient.post<void>(
      `${environment.apiUrl}/api/programs/${programId}/sections-schedule`,
      { schedules: request },
    );
  }
}
