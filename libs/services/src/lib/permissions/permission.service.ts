import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ApiClientService } from '../api/api-client.service';
import { BasePermissionService, ParsedPermissions } from './base-permission.service';
import {
  PermissionsRequest,
  UserPermissionsResponse,
  FacultyRoleResponse,
} from '@project-manara-frontend/models';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(
    private apiClient: ApiClientService,
    private base: BasePermissionService
  ) {}

  getAll(): Observable<string[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/permissions`);
  }

  getUserPermissions(userId: number): Observable<ParsedPermissions> {
    return this.apiClient
      .get<UserPermissionsResponse>(
        `${environment.apiUrl}/api/users/${userId}/permissions`
      )
      .pipe(
        map((data) =>
          this.base.parse(
            data.defaultPermissionsInFaculty ?? [],
            data.overridePermissions ?? []
          )
        )
      );
  }

  getFacultyRoleWithPermissions(
    facultyId: number,
    roleId: number
  ): Observable<{ role: FacultyRoleResponse; parsed: ParsedPermissions }> {
    return this.apiClient
      .get<FacultyRoleResponse>(
        `${environment.apiUrl}/api/roles/${roleId}/faculties/${facultyId}`
      )
      .pipe(
        map((data) => ({
          role: data,
          parsed: this.base.parse(
            data.defaultPermissions ?? [],
            data.overridePermissions ?? []
          ),
        }))
      );
  }

  updateForUser(
    userId: number,
    defaults: string[],
    selected: string[]
  ): Observable<any> {
    const request: PermissionsRequest = {
      claimValues: this.base.getOverrides(defaults, selected),
    };
    return this.apiClient.put(
      `${environment.apiUrl}/api/users/${userId}/permissions`,
      request
    );
  }

  updateForFaculty(
    roleId: number,
    facultyId: number,
    defaults: string[],
    selected: string[]
  ): Observable<any> {
    const request: PermissionsRequest = {
      claimValues: this.base.getOverrides(defaults, selected),
    };
    return this.apiClient.put(
      `${environment.apiUrl}/api/roles/${roleId}/faculties/${facultyId}/permissions`,
      request
    );
  }
}
