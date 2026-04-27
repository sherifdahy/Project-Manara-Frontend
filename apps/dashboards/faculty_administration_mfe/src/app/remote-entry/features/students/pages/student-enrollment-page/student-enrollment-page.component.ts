import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentEnrollmentResponse } from '@project-manara-frontend/models';
import { ProgramEnrollmentsService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-enrollment-page',
  standalone: false,
  templateUrl: './student-enrollment-page.component.html',
  styleUrls: ['./student-enrollment-page.component.css'],
})
export class StudentEnrollmentPageComponent implements OnInit {
  studentEnrollments$!: Observable<StudentEnrollmentResponse[]>;
  userId!: number;
  constructor(
    private route: ActivatedRoute,
    private programEnrollmentsService: ProgramEnrollmentsService,
  ) {
    this.userId = this.route.parent?.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.studentEnrollments$ = this.programEnrollmentsService.getAllByStudent(
      this.userId,
      false,
    );
  }
}
