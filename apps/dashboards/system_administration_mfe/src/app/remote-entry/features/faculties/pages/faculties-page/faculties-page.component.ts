import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyResponse } from '@project-manara-frontend/models';
import { FacultyService, HttpErrorService } from '@project-manara-frontend/services';
import { Observable, of } from 'rxjs';
import { FacultyFormDialogComponent } from '../../components/faculty-form-dialog/faculty-form-dialog.component';

@Component({
  selector: 'app-faculties-page',
  standalone: false,
  templateUrl: './faculties-page.component.html',
  styleUrls: ['./faculties-page.component.css']
})
export class FacultiesPageComponent implements OnInit {

  includeDisabled = false;
  searchTerm = '';

  faculties$: Observable<FacultyResponse[]> = of([]);

  universityId!: number;

  constructor(
    private matDialog: MatDialog,
    private httpErrorService: HttpErrorService,
    private facultyService: FacultyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.universityId = Number(this.route.parent?.parent?.snapshot.paramMap.get('id'));
    this.loadFaculties();
  }

  loadFaculties(): void {
    this.faculties$ = this.facultyService.getAll(
      this.universityId,
      this.includeDisabled
    );
  }

  openFacultyFormDialog(): void {
    let dialogRef = this.matDialog.open(FacultyFormDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: { universityId: this.universityId }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.loadFaculties();
        }
      });

  }

  onToggleStatus(id: number): void {
    this.facultyService.toggleStatus(id).subscribe({
      next: () => this.loadFaculties(),
      error: (err) => this.httpErrorService.handle(err)
    });
  }

  onSearch(): void {
    this.loadFaculties();
  }

  onFilterChange(): void {
    this.loadFaculties();
  }

  trackById(index: number, item: FacultyResponse): number {
    return item.id;
  }
}
