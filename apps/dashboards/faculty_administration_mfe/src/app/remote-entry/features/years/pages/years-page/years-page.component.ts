import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { YearResponse } from '@project-manara-frontend/models';
import {
  HttpErrorService,
  YearsService,
} from '@project-manara-frontend/services';
import { filter, finalize, Observable, switchMap } from 'rxjs';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { MatDialog } from '@angular/material/dialog';
import { YearFormDialogComponent } from '../../components/year-form-dialog/year-form-dialog.component';

@Component({
  selector: 'app-years-page',
  standalone: false,
  templateUrl: './years-page.component.html',
  styleUrls: ['./years-page.component.css'],
})
export class YearsPageComponent implements OnInit {
  years$!: Observable<YearResponse[]>;
  totalYears = 0;
  activeYears = 0;
  disabledYears = 0;
  facultyId$ = this.store.select(selectFacultyId);
  includeDisabled: boolean = false;
  isLoading: boolean = false;
  constructor(
    private yearService: YearsService,
    private store: Store,
    private httpErrorService: HttpErrorService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadYears();
  }

  loadYears(): void {
    this.isLoading = true;

    this.years$ = this.facultyId$.pipe(
      filter((id): id is number => !!id),
      switchMap((id) =>
        this.yearService
          .getAll(id, this.includeDisabled)
          .pipe(finalize(() => (this.isLoading = false))),
      ),
    );

    this.years$.subscribe((years) => {
      this.totalYears = years.length;
      this.activeYears = years.filter((x) => !x.isDeleted).length;
      this.disabledYears = years.filter((x) => x.isDeleted).length;
    });
  }

  onFilterChange() {
    this.loadYears();
  }

  onToggleStatus(id: number) {
    this.yearService.toggleStatus(id).subscribe({
      next: () => {
        this.loadYears();
      },
      error: (errors) => {
        this.httpErrorService.handle(errors);
      },
    });
  }

  openYearFormDialog() {
    this.matDialog
      .open(YearFormDialogComponent, {
        width: '600px',
        maxWidth: '90vw',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadYears();
      });
  }
}
