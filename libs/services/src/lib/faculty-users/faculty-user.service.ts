import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { FacultyUserRequest, FacultyUserResponse, PaginatedList, RequestFilters } from '@project-manara-frontend/models';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacultyUserService {

  constructor(private apiClient: ApiClientService) { }

  getAll(facultyId: number, filters?: RequestFilters, includeDisabled: boolean = false): Observable<PaginatedList<FacultyUserResponse>> {

    let params = new HttpParams();

    if (filters) {
      params = params
        .set('pageNumber', filters.PageNumber)
        .set('pageSize', filters.PageSize);

      if (filters.SearchValue)
        params = params.set('searchValue', filters.SearchValue);

      if (filters.SortDirection && filters.SortColumn) {
        params = params
          .set('sortDirection', filters.SortDirection)
          .set('sortColumn', filters.SortColumn);
      }
    }

    return this.apiClient.get(`${environment.apiUrl}/api/faculties/${facultyId}/facultyUsers?includeDisabled=${includeDisabled}`, params);
  }

  my(): Observable<FacultyUserResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/facultyUsers/my`);
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
