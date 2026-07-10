import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentLecture } from '../../features/academic-progress/models/student-lecture';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  AvailableLectureResponse,
  StudentLectureSelectionResponse,
} from '../../features/course-registration/models/available-lecture-response';
import { MeResponse } from '../dtos/student/responses/me-response';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  constructor(private http: HttpClient) {
  }

  student$ = new BehaviorSubject<MeResponse | null>(null);

  me() {
    return this.http.get<MeResponse>(`${environment.apiUrl}/me/student`).pipe(
      tap((response) => {
        this.student$.next(response);
      }),
    );
  }

  getAcademicProgress(studentId: number) {
    return this.http.get<StudentLecture[]>(
      `${environment.apiUrl}/api/StudentsPortal/students/${studentId}/lectures`,
    );
  }

  getAvailableLectures(
    studentId: number,
  ): Observable<AvailableLectureResponse[]> {
    return this.http.get<AvailableLectureResponse[]>(
      `${environment.apiUrl}/api/StudentsPortal/students/${studentId}/available-lectures`,
    );
  }

  selectLecture(
    studentId: number,
    lectureScheduleId: number,
  ): Observable<StudentLectureSelectionResponse> {
    return this.http.post<StudentLectureSelectionResponse>(
      `${environment.apiUrl}/api/StudentsPortal/students/${studentId}/available-lectures`,
      { lectureScheduleId },
    );
  }
}
