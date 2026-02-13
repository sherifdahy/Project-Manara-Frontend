import { Injectable } from '@angular/core';
import { RoleResponse } from '@project-manara-frontend/models';
import { Observable } from 'rxjs';
import { ApiClientService } from '../api/api-client.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScopesService {
  constructor(private apiClient: ApiClientService) {}
  getByName(scopeName: string): Observable<any> {
    return this.apiClient.get(`${environment.apiUrl}/api/Scopes/${scopeName}`);
  }
}
