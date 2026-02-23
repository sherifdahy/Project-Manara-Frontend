import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { PaginatedList, RequestFilters, UniversityUserRequest, UniversityUserResponse } from '@project-manara-frontend/models';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversityUserService {

  constructor(private apiClient: ApiClientService) { }

  getAll(universityId: number, filters?: RequestFilters, includeDisabled: boolean = false): Observable<PaginatedList<UniversityUserResponse>> {

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

    return this.apiClient.get(`${environment.apiUrl}/api/universities/${universityId}/universityUsers?includeDisabled=${includeDisabled}`, params);
  }

  my(): Observable<UniversityUserResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/universityUsers/my`);
  }

  get(id: number): Observable<UniversityUserResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/universityUsers/${id}`);
  }

  create(universityId: number, request: UniversityUserRequest) {
    return this.apiClient.post(`${environment.apiUrl}/api/universities/${universityId}/universityUsers`, request);
  }

  update(id: number, request: UniversityUserRequest) {
    return this.apiClient.put(`${environment.apiUrl}/api/universityUsers/${id}`, request);
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(`${environment.apiUrl}/api/universityUsers/${id}`);
  }
}
