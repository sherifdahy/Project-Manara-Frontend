import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyResponse, UniversityDetailResponse } from '@project-manara-frontend/models';
import { AccountService, FacultyService, HttpErrorService, UniversityService } from '@project-manara-frontend/services'
import { Observable } from 'rxjs';
import { PermissionConsts } from '@project-manara-frontend/consts'
import { FacultyFormDialogComponent } from '../../components/faculty-form-dialog/faculty-form-dialog.component';
@Component({
  selector: 'app-faculties-page',
  standalone: false,
  templateUrl: './faculties-page.component.html',
  styleUrls: ['./faculties-page.component.css']
})
export class FacultiesPageComponent implements OnInit {
  includeDisabled: boolean = false;
  searchTerm!: string;
  permissions = PermissionConsts;
  faculties$!: Observable<FacultyResponse[]>;
  constructor(
    private accountService: AccountService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private httpErrorService: HttpErrorService,
    private facultyService: FacultyService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loadFaculties();
  }

  loadFaculties() {
    this.faculties$ = this.facultyService.getAll(this.accountService.currentUser?.universityId ?? 0, this.includeDisabled);
  }

  openFacultyFormDialog() {
    this.matDialog.open(FacultyFormDialogComponent, {
      width: '600px',
      maxWidth: '90vw'
    }).afterClosed().subscribe((result) => {
      if (result)
        this.router.navigate([result.id]);

    });
  }

  onToggleStatus(id: number) {
    this.facultyService.toggleStatus(id).subscribe({
      next: () => {
        this.loadFaculties();
      },
      error: (errors) => {
        this.httpErrorService.handle(errors);
      }
    });
  }

  onSearch() {

  }

  onFilterChange(): void {
    this.loadFaculties();
  }

  onEdit(id: number) {

  }
}
