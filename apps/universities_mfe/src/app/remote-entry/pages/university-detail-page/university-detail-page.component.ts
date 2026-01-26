import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UniversityDetailResponse } from '@project-manara-frontend/models';
import { NotificationService, UniversityService } from '@project-manara-frontend/services'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-university-detail-page',
  standalone: false,
  templateUrl: './university-detail-page.component.html',
  styleUrls: ['./university-detail-page.component.css']
})
export class UniversityDetailPageComponent implements OnInit {
  universityId!: number;
  currentUniversity$!: Observable<UniversityDetailResponse>;
  constructor(
    // private matDialog: MatDialog
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private universityService: UniversityService,
  ) {
    this.universityId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.currentUniversity$ = this.universityService.get(this.universityId);
  }

  openCreateFaculityFormDialog() {
    // this.matDialog.open();
  }
}
