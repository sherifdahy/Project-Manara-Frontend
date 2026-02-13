import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UniversityDetailResponse } from '@project-manara-frontend/models';
import { UniversityService } from '@project-manara-frontend/services'
import { Observable } from 'rxjs';
import { PermissionConsts } from '@project-manara-frontend/consts'
import { UniversityFormDialogComponent } from '../../components/university-form-dialog/university-form-dialog.component';
@Component({
  selector: 'app-university-detail-page',
  standalone: false,
  templateUrl: './university-detail-page.component.html',
  styleUrls: ['./university-detail-page.component.css']
})
export class UniversityDetailPageComponent implements OnInit {
  permissions = PermissionConsts;
  universityId!: number;
  currentUniversity$!: Observable<UniversityDetailResponse>;
  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private universityService: UniversityService,
  ) {
    this.universityId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loadCurrentUniversity();

  }

  loadCurrentUniversity() {
    this.currentUniversity$ = this.universityService.get(this.universityId);
  }

  openCreateFacultyFormDialog(): void {
    // const dialogRef = this.matDialog.open(FacultyFormDialogComponent, {
    //   width: '600px',
    //   maxWidth: '90vw',
    //   data: {
    //     universityId: this.universityId
    //   }
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.loadCurrentUniversity();
    //   }
    // });
  }

  openUniversityFormDialog(): void {
    const dialogRef = this.matDialog.open(UniversityFormDialogComponent, {
      width: '600px',
      maxHeight: '90vw',
      data: {
        universityId: this.universityId
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCurrentUniversity();
      }
    })
  }
}
