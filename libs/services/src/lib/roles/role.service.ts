import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { RoleDetailResponse, RoleRequest, RoleResponse } from '@project-manara-frontend/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiClient: ApiClientService) { }

  getAll(includeDisabled: boolean): Observable<RoleResponse[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/roles?includeDisabled=${includeDisabled}`);
  }

  get(id: number): Observable<RoleDetailResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/roles/${id}`);
  }

  create(request: RoleRequest) {
    return this.apiClient.post(`${environment.apiUrl}/api/roles`, request);
  }

  update(id: number, request: RoleRequest) {
    return this.apiClient.put(`${environment.apiUrl}/api/roles/${id}`, request);
  }

  toggleStatus(id: number) {
    return this.apiClient.delete(`${environment.apiUrl}/api/roles/${id}`);
  }

}
