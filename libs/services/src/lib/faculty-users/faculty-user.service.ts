import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { FacultyUserRequest, FacultyUserResponse } from '@project-manara-frontend/models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyUserService {

  constructor(private apiClient: ApiClientService) { }

  getAll(facultyId: number): Observable<FacultyUserResponse[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/faculties/${facultyId}/facultyUsers`);
  }

  get(id: number): Observable<FacultyUserResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/facultyUsers/${id}`);
  }

  create(facultyId: number, request: FacultyUserRequest) {
    return this.apiClient.post(`${environment.apiUrl}/api/faculties/${facultyId}/facultyUsers`, request);
  }

  update(id: number, request: FacultyUserRequest) {
    return this.apiClient.put(`${environment.apiUrl}/api/facultyUsers/${id}`, request);
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(`${environment.apiUrl}/api/facultyUsers/${id}`);
  }
}
