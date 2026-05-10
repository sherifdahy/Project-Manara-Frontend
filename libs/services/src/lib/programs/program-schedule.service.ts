import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../api/api-client.service';
import {
  ProgramScheduleRequest,
  ProgramScheduleResponse,
} from '@project-manara-frontend/models';
import { environment } from 'environments/environment';

@Injectable()
export class ProgramScheduleService {
  constructor(private apiClient: ApiClientService) {}
  
  getLecturesSchedule(programId: number): Observable<ProgramScheduleResponse> {
    return this.apiClient.get<ProgramScheduleResponse>(
      `${environment.apiUrl}/api/programs/${programId}/lectures-schedule`,
    );
  }

  saveLecturesSchedule(
    programId: number,
    request: ProgramScheduleRequest,
  ): Observable<void> {
    return this.apiClient.post<void>(
      `${environment.apiUrl}/api/programs/${programId}/lectures-schedule`,
      request,
    );
  }

    getSectionsSchedule(programId: number): Observable<ProgramScheduleResponse> {
    return this.apiClient.get<ProgramScheduleResponse>(
      `${environment.apiUrl}/api/programs/${programId}/sections-schedule`,
    );
  }

  saveSectionsSchedule(
    programId: number,
    request: ProgramScheduleRequest,
  ): Observable<void> {
    return this.apiClient.post<void>(
      `${environment.apiUrl}/api/programs/${programId}/sections-schedule`,
      request,
    );
  }
}
