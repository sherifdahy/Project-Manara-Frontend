import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermessionService {
  constructor(private apiClient: ApiClientService) {}
  getAll(): Observable<string[]> {
    return this.apiClient.get(`${environment.apiUrl}/api/Permissions`);
  }
}
