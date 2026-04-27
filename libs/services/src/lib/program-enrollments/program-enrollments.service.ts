import { Injectable } from '@angular/core';
import {
  EditProgramEnrollmentRequest,
  PaginatedList,
  ProgramEnrollmentRequest,
  ProgramEnrollmentsDetailResponse,
  ProgramEnrollmentsResponse,
  RequestFilters,
  StudentEnrollmentResponse,
} from '@project-manara-frontend/models';
import { Observable } from 'rxjs';
import { ApiClientService } from '../api/api-client.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProgramEnrollmentsService {
  constructor(private apiClient: ApiClientService) {}

  getAllByProgram(
    programId: number,
    filters?: RequestFilters,
    includeDisabled: boolean = false,
  ): Observable<PaginatedList<ProgramEnrollmentsResponse>> {
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
      `${environment.apiUrl}/api/programs/${programId}/enrollments?includeDisabled=${includeDisabled}`,
      params,
    );
  }

  getAllByStudent(
    studentId: number,
    includeDisabled: boolean,
  ): Observable<StudentEnrollmentResponse[]> {
    return this.apiClient.get(
      `${environment.apiUrl}/api/students/${studentId}/enrollments?includeDisabled=${includeDisabled}`,
    );
  }

  get(id: number): Observable<ProgramEnrollmentsDetailResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/Enrollments/${id}
`);
  }

  create(programId: number, request: ProgramEnrollmentRequest) {
    return this.apiClient.post(
      `${environment.apiUrl}/api/programs/${programId}/enrollments`,
      request,
    );
  }

  edit(id: number, request: EditProgramEnrollmentRequest) {
    return this.apiClient.put(
      `${environment.apiUrl}/api/Enrollments/${id}`,
      request,
    );
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(
      `${environment.apiUrl}/api/Enrollments/${id}/toggle-status`,
    );
  }
}
