import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import {
  DepartmentRequest,
  DepartmentResponse,
} from '@project-manara-frontend/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private apiClient: ApiClientService) {}

  getAll(
    facultId: number,
    includeDisabled: boolean,
  ): Observable<DepartmentResponse[]> {
    return this.apiClient.get(
      `${environment.apiUrl}/api/faculties/${facultId}/departments?includeDisabled=${includeDisabled}`,
    );
  }

  create(facultyId: number, request: DepartmentRequest) {
    return this.apiClient.post(
      `${environment.apiUrl}/api/faculties/${facultyId}/departments`,
      request,
    );
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(
      `${environment.apiUrl}/api/departments/${id}/toggle-status`,
    );
  }
}
