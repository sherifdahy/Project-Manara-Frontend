import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { PermissionsRequest, UserPermissionsResponse } from '@project-manara-frontend/models';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private apiClient: ApiClientService) { }

  getAll(): Observable<string[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/permissions`);
  }

  getUserPermissions(userId: number): Observable<UserPermissionsResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/users/${userId}/permissions`);
  }

  updateForUser(userId: number, permissions: PermissionsRequest) {
    return this.apiClient.put(`${environment.apiUrl}/api/users/${userId}/permissions`, permissions)
  }

  updateForFaculty(roleId: number, facultyId: number, permissions: PermissionsRequest) {
    return this.apiClient.put(`${environment.apiUrl}/api/roles/${roleId}/faculties/${facultyId}/permissions`, permissions)
  }
}
