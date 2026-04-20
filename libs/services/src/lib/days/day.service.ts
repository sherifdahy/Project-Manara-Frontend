import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';

import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { DayResponse } from '@project-manara-frontend/models';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  constructor(private apiClient: ApiClientService) {}

  getAll(): Observable<DayResponse[]> {
    return this.apiClient.get(
      `${environment.apiUrl}/api/days`,
    );
  }


}
