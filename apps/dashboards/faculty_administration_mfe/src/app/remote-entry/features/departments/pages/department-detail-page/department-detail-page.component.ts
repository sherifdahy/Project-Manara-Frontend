import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DepartmentDetailResponse,
  FacultyDetailResponse,
} from '@project-manara-frontend/models';
import {
  DepartmentService,
  FacultyService,
} from '@project-manara-frontend/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department-detail-page',
  standalone: false,
  templateUrl: './department-detail-page.component.html',
  styleUrls: ['./department-detail-page.component.css'],
})
export class DepartmentDetailPageComponent implements OnInit {
  departmentId!: number;

  department$!: Observable<DepartmentDetailResponse>;
  faculty$!: Observable<FacultyDetailResponse>;
  constructor(
    private route: ActivatedRoute,
    private facultyService: FacultyService,
    private departmentService: DepartmentService,
  ) {
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.faculty$ = this.facultyService.my();
    this.department$ = this.departmentService.get(this.departmentId);
  }
}
