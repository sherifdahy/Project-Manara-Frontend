import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import {
  TermResponse,
  YearDetailResponse,
  YearRequest,
  YearResponse,
} from '@project-manara-frontend/models';

@Injectable({
  providedIn: 'root',
})
export class YearsService {
  constructor(private apiClient: ApiClientService) {}

  getAllTerms(): Observable<TermResponse[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/Years/terms`);
  }

  getAll(
    facultId: number,
    includeDisabled: boolean,
  ): Observable<YearResponse[]> {
    return this.apiClient.get(
      `${environment.apiUrl}/api/faculties/${facultId}/years?includeDisabled=${includeDisabled}`,
    );
  }

  get(id: number): Observable<YearDetailResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/years/${id}`);
  }

  create(facultyId: number, request: YearRequest) {
    return this.apiClient.post(
      `${environment.apiUrl}/api/faculties/${facultyId}/years`,
      request,
    );
  }
  update(id: number, request: YearRequest) {
    return this.apiClient.put(`${environment.apiUrl}/api/years/${id}`, request);
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(
      `${environment.apiUrl}/api/years/${id}/toggle-status`,
    );
  }
}
