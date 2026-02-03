import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacultyDetailResponse, FacultyResponse, UniversityDetailResponse } from '@project-manara-frontend/models';
import { AccountService, FacultyService, UniversityService } from '@project-manara-frontend/services';
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
  universityId!:number;
  constructor(
    private accountService: AccountService,
    private universityService: UniversityService,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
  ) {
    this.universityId = Number(this.accountService.currentUser?.universityId);
    this.facultyId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.university$ = this.universityService.get(this.universityId);
    this.faculty$ = this.facultyService.get(this.facultyId);
  }

}
