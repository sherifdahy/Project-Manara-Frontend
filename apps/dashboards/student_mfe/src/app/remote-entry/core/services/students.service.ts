import { Injectable } from '@angular/core';
import { StudentLecture } from '../../features/academic-progress/models/student-lecture';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import {
  AvailableLectureResponse,
  StudentLectureSelectionResponse,
} from '../../features/course-registration/models/available-lecture-response';
import { MeResponse } from '../dtos/student/responses/me-response';
import { ApiClientService } from '@project-manara-frontend/services';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly base = `${environment.apiUrl}/api/StudentsPortal/students`;
  private readonly cache = new Map<string, any>();

  student$ = new BehaviorSubject<MeResponse | null>(null);

  constructor(private apiClient: ApiClientService) {}

  me(): Observable<MeResponse> {
    const current = this.student$.value;
    if (current) return of(current);

    return this.apiClient.get<MeResponse>(`${environment.apiUrl}/me/student`).pipe(
      tap((response) => this.student$.next(response)),
    );
  }

  getAcademicProgress(studentId: number) {
    const key = `lectures:${studentId}`;
    if (this.cache.has(key)) return of(this.cache.get(key));

    return this.apiClient
      .get<StudentLecture[]>(`${this.base}/${studentId}/lectures`)
      .pipe(tap((res) => this.cache.set(key, res)));
  }

  getAvailableLectures(
    studentId: number,
  ): Observable<AvailableLectureResponse[]> {
    const key = `available-lectures:${studentId}`;
    if (this.cache.has(key)) return of(this.cache.get(key));

    return this.apiClient
      .get<AvailableLectureResponse[]>(
        `${this.base}/${studentId}/available-lectures`,
      )
      .pipe(tap((res) => this.cache.set(key, res)));
  }

  selectLecture(
    studentId: number,
    lectureScheduleId: number,
  ): Observable<StudentLectureSelectionResponse> {
    // invalidate available lectures cache for this student
    const key = `available-lectures:${studentId}`;
    this.cache.delete(key);

    return this.apiClient.post<StudentLectureSelectionResponse>(
      `${this.base}/${studentId}/available-lectures`,
      { lectureScheduleId },
    );
  }
}
