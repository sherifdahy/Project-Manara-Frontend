import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { RequestFilters } from 'libs/models/src/lib/common/request-filters';
import { DepartmentUserResponse } from 'libs/models/src/lib/department-users/responses/department-user-response';
import {
  DepartmentUserRequest,
  PaginatedList,
} from '@project-manara-frontend/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentUserService {
  constructor(private apiClient: ApiClientService) {}

  getAll(
    departmentId: number,
    filters?: RequestFilters,
    includeDisabled: boolean = false,
  ): Observable<PaginatedList<DepartmentUserResponse>> {
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

    return this.apiClient.get(
      `${environment.apiUrl}/api/departments/${departmentId}/departmentUsers?includeDisabled=${includeDisabled}`,
      params,
    );
  }
  create(departmentId: number, request: DepartmentUserRequest) {
    return this.apiClient.post(
      `${environment.apiUrl}/api/departments/${departmentId}/departmentUsers`,
      request,
    );
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(
      `${environment.apiUrl}/api/departmentUsers/${id}`,
    );
  }
}
