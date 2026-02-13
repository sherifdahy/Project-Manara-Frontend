import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { ScopeDetailResponse, ScopeResponse } from '@project-manara-frontend/models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScopeService {
  constructor(private apiClient: ApiClientService) { }
  getAll(): Observable<ScopeResponse[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/scopes`);
  }
  get(name: string): Observable<ScopeDetailResponse> {
    return this.apiClient.get(`${environment.apiUrl}/api/scopes/${name}`);
  }
}
