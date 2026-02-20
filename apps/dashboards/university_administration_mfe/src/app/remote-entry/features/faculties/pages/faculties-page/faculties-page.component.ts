import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyResponse } from '@project-manara-frontend/models';
import { UserService, FacultyService, HttpErrorService, UniversityService } from '@project-manara-frontend/services'
import { filter, Observable, switchMap } from 'rxjs';
import { FacultyFormDialogComponent } from '../../components/faculty-form-dialog/faculty-form-dialog.component';
import { Store } from '@ngrx/store';
import { selectUniversityIdState } from '../../../../store/selectors/university.selectors';
@Component({
  selector: 'app-faculties-page',
  standalone: false,
  templateUrl: './faculties-page.component.html',
  styleUrls: ['./faculties-page.component.css']
})
export class FacultiesPageComponent implements OnInit {
  includeDisabled: boolean = false;
  searchTerm!: string;
  faculties$!: Observable<FacultyResponse[]>;
  universityId$ = this.store.select(selectUniversityIdState);
  constructor(
    private matDialog: MatDialog,
    private httpErrorService: HttpErrorService,
    private facultyService: FacultyService,
    private router: Router,
    private store: Store
  ) {

  }

  ngOnInit() {
    this.loadFaculties();
  }

  loadFaculties(): void {
    this.faculties$ = this.universityId$.pipe(
      filter((id): id is number => !!id),
      switchMap((id) =>
        this.facultyService.getAll(id, this.includeDisabled)
      )
    );
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
