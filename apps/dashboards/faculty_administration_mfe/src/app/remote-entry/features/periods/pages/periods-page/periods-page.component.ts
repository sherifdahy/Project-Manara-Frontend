import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap, take } from 'rxjs';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { PeriodResponse } from '@project-manara-frontend/models';
import {
  HttpErrorService,
  PeriodsService,
} from '@project-manara-frontend/services';
import { MatDialog } from '@angular/material/dialog';
import { PeriodFormDialogComponent } from '../../components/period-form-dialog/period-form-dialog.component';

@Component({
  selector: 'app-periods-page',
  standalone: false,
  templateUrl: './periods-page.component.html',
  styleUrls: ['./periods-page.component.css'],
})
export class PeriodsPageComponent implements OnInit {
  periods$!: Observable<PeriodResponse[]>;
  facultyId$ = this.store.select(selectFacultyId);
  includeDisabled: boolean = false;
  constructor(
    private store: Store,
    private periodsService: PeriodsService,
    private httpErrorService: HttpErrorService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadPeriods();
  }

  loadPeriods(): void {
    this.periods$ = this.facultyId$.pipe(
      filter((id): id is number => !!id),
      switchMap((id) => this.periodsService.getAll(id, this.includeDisabled)),
    );
  }

  onFilterChange() {
    this.loadPeriods();
  }
  onToggleStatus(startTime: string, endTime: string) {
    this.facultyId$
      .pipe(
        filter((id): id is number => !!id),
        take(1),
        switchMap((id) =>
          this.periodsService.toggleStatus(id, startTime, endTime),
        ),
      )
      .subscribe({
        next: () => {
          this.loadPeriods();
        },
        error: (errors) => {
          this.httpErrorService.handle(errors);
        },
      });
  }
  openPeriodFormDialog() {
    this.matDialog
      .open(PeriodFormDialogComponent, {
        width: '600px',
        maxWidth: '90vw',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadPeriods();
      });
  }
}
