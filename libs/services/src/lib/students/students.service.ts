import { Injectable } from '@angular/core';
import { StudentLecture } from '../../../../models/src/lib/students/responses/student-lecture';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import {
  AvailableLectureResponse,
  StudentLectureSelectionResponse,
} from '../../../../models/src/lib/students/responses/available-lecture-response';
import { MeResponse } from '../../../../../apps/dashboards/student_mfe/src/app/remote-entry/core/dtos/student/responses/me-response';
import { ApiClientService } from '@project-manara-frontend/services';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly base = `${environment.apiUrl}/api/StudentsPortal/students`;

  student$ = new BehaviorSubject<MeResponse | null>(null);

  constructor(private apiClient: ApiClientService) {}

  me(): Observable<MeResponse> {
    const current = this.student$.value;
    if (current) return of(current);

    return this.apiClient
      .get<MeResponse>(`${environment.apiUrl}/me/student`)
      .pipe(tap((response) => this.student$.next(response)));
  }

  getAcademicProgress(studentId: number) {
    return this.apiClient.get<StudentLecture[]>(
      `${this.base}/${studentId}/lectures`,
    );
  }

  getAvailableLectures(
    studentId: number,
  ): Observable<AvailableLectureResponse[]> {
    return this.apiClient.get<AvailableLectureResponse[]>(
      `${this.base}/${studentId}/available-lectures`,
    );
  }

  selectLecture(
    studentId: number,
    lectureScheduleId: number,
  ): Observable<StudentLectureSelectionResponse> {
    // invalidate available lectures cache for this student
    return this.apiClient.post<StudentLectureSelectionResponse>(
      `${this.base}/${studentId}/available-lectures`,
      { lectureScheduleId },
    );
  }
}
