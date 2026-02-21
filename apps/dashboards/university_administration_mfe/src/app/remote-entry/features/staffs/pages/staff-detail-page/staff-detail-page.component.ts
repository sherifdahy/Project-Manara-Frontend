import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyUserResponse } from '@project-manara-frontend/models';
import { FacultyUserService, HttpErrorService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-staff-detail-page',
  standalone: false,
  templateUrl: './staff-detail-page.component.html',
  styleUrls: ['./staff-detail-page.component.css']
})
export class StaffDetailPageComponent implements OnInit {

  staff$!: Observable<FacultyUserResponse>;
  staffId!: number;
  constructor() {
  }
  ngOnInit() {
  }


}
