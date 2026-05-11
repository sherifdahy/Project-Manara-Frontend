import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { SubjectResponse } from '@project-manara-frontend/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({'providedIn' : 'root'})
export class ProgramSubjectService {
  constructor(private apiClient: ApiClientService) {}
  getSubjects(programId: number): Observable<SubjectResponse[]> {
    return this.apiClient.get(
      `${environment.apiUrl}/api/programs/${programId}/subjects`,
    );
  }

  addSubject(programId: number, subjectId: number) {
    return this.apiClient.post(
      `${environment.apiUrl}/api/programs/${programId}/subjects/${subjectId}`,
      {},
    );
  }

  removeSubject(programId: number, subjectId: number) {
    return this.apiClient.delete(
      `${environment.apiUrl}/api/programs/${programId}/subjects/${subjectId}`,
    );
  }
}
