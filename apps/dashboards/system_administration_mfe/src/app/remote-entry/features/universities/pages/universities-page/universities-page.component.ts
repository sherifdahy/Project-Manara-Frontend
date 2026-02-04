import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UniversityResponse } from '@project-manara-frontend/models';
import { HttpErrorService, UniversityService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';
import { UniversityFormDialogComponent } from '../../components/university-form-dialog/university-form-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-universities-page',
  standalone: false,
  templateUrl: './universities-page.component.html',
  styleUrls: ['./universities-page.component.css']
})
export class UniversitiesPageComponent implements OnInit {
  universities$!: Observable<UniversityResponse[]>;
  searchTerm: string = '';
  includeDisabled: boolean = false;

  constructor(
    private router: Router,
    private httpErrorService: HttpErrorService,
    private universityService: UniversityService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadUniversities();
  }

  loadUniversities(): void {
    this.universities$ = this.universityService.getAll(this.includeDisabled);
  }

  onSearch(): void {

  }

  onFilterChange(): void {
    this.loadUniversities();
  }

  getYearsOld(establishedYear: number): number {
    return new Date().getFullYear() - establishedYear;
  }

  openUniversityForm(id?: number): void {
    this.matDialog.open(UniversityFormDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: {
        universityId: id
      }
    }).afterClosed().subscribe((result) => {
      if (result)
        this.router.navigate([result.id]);
    });
  }


  onToggleStatus(id: number): void {
    this.universityService.toggleStatus(id).subscribe({
      next: () => {
        this.loadUniversities();
      },
      error: (error) => {
        this.httpErrorService.handle(error);
      }
    })
  }
}
