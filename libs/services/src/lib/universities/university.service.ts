import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { UniversityRequest, UniversityDetailResponse, UniversityResponse } from '@project-manara-frontend/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private apiClient: ApiClientService) { }

  getAll(includeDisabled: boolean): Observable<UniversityResponse[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/universities?includeDisabled=${includeDisabled}`);
  }

  get(id: number): Observable<UniversityDetailResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/universities/${id}`);
  }

  my(): Observable<UniversityDetailResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/universities/my`)
  }

  create(request: UniversityRequest) {
    return this.apiClient.post(`${environment.apiUrl}/api/universities`, request);
  }

  update(id: number, request: UniversityRequest) {
    return this.apiClient.put(`${environment.apiUrl}/api/universities/${id}`, request);
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(`${environment.apiUrl}/api/universities/${id}/toggle-status`);
  }
}
