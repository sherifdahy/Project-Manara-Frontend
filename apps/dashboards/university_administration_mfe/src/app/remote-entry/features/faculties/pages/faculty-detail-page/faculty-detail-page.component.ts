import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacultyDetailResponse, UniversityDetailResponse } from '@project-manara-frontend/models';
import { UserService, FacultyService, UniversityService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faculty-detail-page',
  standalone: false,
  templateUrl: './faculty-detail-page.component.html',
  styleUrls: ['./faculty-detail-page.component.css']
})
export class FacultyDetailPageComponent implements OnInit {

  faculty$!: Observable<FacultyDetailResponse>;
  university$! : Observable<UniversityDetailResponse>;
  facultyId!: number;
  constructor(
    private userService: UserService,
    private universityService: UniversityService,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
  ) {
    this.facultyId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.university$ = this.universityService.my();
    this.faculty$ = this.facultyService.get(this.facultyId);
  }

}
