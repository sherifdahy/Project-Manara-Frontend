import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { PeriodRequest, PeriodResponse } from '@project-manara-frontend/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeriodsService {
  constructor(private apiClient: ApiClientService) {}

  getAll(
    facultId: number,
    includeDisabled: boolean,
  ): Observable<PeriodResponse[]> {
    return this.apiClient.get(
      `${environment.apiUrl}/api/faculties/${facultId}/periods?includeDisabled=${includeDisabled}`,
    );
  }
  create(facultyId: number, request: PeriodRequest) {
    return this.apiClient.post(
      `${environment.apiUrl}/api/faculties/${facultyId}/periods`,
      request,
    );
  }

  toggleStatus(
    facultyId: number,
    startTime: string,
    endTime: string,
  ): Observable<void> {
    return this.apiClient.delete(
      `${environment.apiUrl}/api/faculties/${facultyId}/periods/${startTime}/${endTime}`,
    );
  }
}
