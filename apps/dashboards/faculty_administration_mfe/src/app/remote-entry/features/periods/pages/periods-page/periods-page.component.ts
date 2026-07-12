import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  finalize,
  map,
  Observable,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { PeriodResponse } from '@project-manara-frontend/models';
import {
  HttpErrorService,
  PeriodsService,
} from '@project-manara-frontend/services';
import { MatDialog } from '@angular/material/dialog';
import { PeriodFormDialogComponent } from '../../components/period-form-dialog/period-form-dialog.component';

interface PeriodsStats {
  total: number;
  active: number;
}

@Component({
  selector: 'app-periods-page',
  standalone: false,
  templateUrl: './periods-page.component.html',
  styleUrls: ['./periods-page.component.css'],
})
export class PeriodsPageComponent implements OnInit {
  periods$!: Observable<PeriodResponse[]>;
  filteredPeriods$!: Observable<PeriodResponse[]>;
  periodsStats$!: Observable<PeriodsStats>;

  facultyId$ = this.store.select(selectFacultyId);
  includeDisabled = false;
  isLoading = false;
  searchTerm = '';

  private searchTerm$ = new BehaviorSubject<string>('');

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
    this.isLoading = true;

    this.periods$ = this.facultyId$.pipe(
      filter((id): id is number => !!id),
      switchMap((id) =>
        this.periodsService
          .getAll(id, this.includeDisabled)
          .pipe(finalize(() => (this.isLoading = false))),
      ),
      shareReplay(1),
    );

    this.periodsStats$ = this.periods$.pipe(
      map((periods) => ({
        total: periods.length,
        active: periods.filter((p) => !p.isDeleted).length,
      })),
    );

    this.filteredPeriods$ = combineLatest([
      this.periods$,
      this.searchTerm$,
    ]).pipe(
      map(([periods, term]) => {
        const search = term.trim().toLowerCase();
        if (!search) return periods;
        return periods.filter(
          (p) =>
            p.startTime?.toLowerCase().includes(search) ||
            p.endTime?.toLowerCase().includes(search),
        );
      }),
    );
  }

  onFilterChange(): void {
    this.loadPeriods();
  }

  onSearchChange(): void {
    this.searchTerm$.next(this.searchTerm);
  }

  onToggleStatus(startTime: string, endTime: string): void {
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

  openPeriodFormDialog(): void {
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