import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { FacultyDetailResponse, FacultyRequest, FacultyResponse } from '@project-manara-frontend/models';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(
    private apiClient: ApiClientService,
  ) { }

  getAll(universityId: number, includeDisabled: boolean): Observable<FacultyResponse[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/universities/${universityId}/faculities?includeDisabled=${includeDisabled}`);
  }

  get(id: number): Observable<FacultyDetailResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/faculities/${id}`);
  }

  create(request: FacultyRequest) {
    return this.apiClient.post(`${environment.apiUrl}/api/faculities`, request);
  }

  update(id: number, request: FacultyRequest) {
    return this.apiClient.put(`${environment.apiUrl}/api/faculities/${id}`, request);
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(`${environment.apiUrl}/api/faculities/${id}/toggle-status`);
  }
}
