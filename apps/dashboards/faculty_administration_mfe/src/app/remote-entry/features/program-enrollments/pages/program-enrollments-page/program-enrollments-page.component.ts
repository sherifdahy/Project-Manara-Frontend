import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PaginatedList,
  ProgramEnrollmentsResponse,
  RequestFilters,
} from '@project-manara-frontend/models';
import {
  HttpErrorService,
  ProgramEnrollmentsService,
} from '@project-manara-frontend/services';
import { finalize, Observable } from 'rxjs';
import { EditProgramEnrollmentComponent } from '../../components/edit-program-enrollment/edit-program-enrollment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-program-enrollments-page',
  standalone: false,
  templateUrl: './program-enrollments-page.component.html',
  styleUrls: ['./program-enrollments-page.component.css'],
})
export class ProgramEnrollmentsPageComponent implements OnInit {
  programEnrollments$!: Observable<PaginatedList<ProgramEnrollmentsResponse>>;
  filters = new RequestFilters();
  isLoading: boolean = false;
  selectedStatus: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  programId!: number;
  sortColumn: string = '';
  sortDirection: string = '';
  constructor(
    private route: ActivatedRoute,
    private programEnrollmentsService: ProgramEnrollmentsService,
    private httpErrorService: HttpErrorService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.programId = +this.route.parent?.parent?.snapshot.params['id'];

    this.loadProgramEnrollments();
  }

  loadProgramEnrollments(): void {
    this.isLoading = true;
    this.programEnrollments$ = this.programEnrollmentsService
      .getAllByProgram(this.programId, this.filters, this.selectedStatus)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      );
  }
  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filters.SortColumn = this.sortColumn;
    this.filters.SortDirection = this.sortDirection;
    this.filters.PageNumber = 1;
    this.loadProgramEnrollments();
  }

  onSearch(): void {
    this.filters.PageNumber = 1;
    this.loadProgramEnrollments();
  }

  onStatusFilter(): void {
    this.filters.PageNumber = 1;
    this.loadProgramEnrollments();
  }

  onPageSizeChange(): void {
    this.filters.PageNumber = 1;
    this.loadProgramEnrollments();
  }

  onDelete(enrollment: any): void {
    this.programEnrollmentsService.toggleStatus(enrollment.id).subscribe({
      next: () => {
        this.loadProgramEnrollments();
      },
      error: (errors) => {
        console.error('Error toggling status:', errors);
        this.httpErrorService.handle(errors);
      },
    });
  }

  goToPage(page: number, totalPages: number): void {
    if (page < 1 || page > totalPages) return;
    this.filters.PageNumber = page;
    this.loadProgramEnrollments();
  }

  getPages(totalPages: number): number[] {
    const current = this.filters.PageNumber;
    const maxVisible = 5;

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getStartIndex(response: PaginatedList<ProgramEnrollmentsResponse>): number {
    return (response.pageNumber - 1) * this.filters.PageSize + 1;
  }

  getEndIndex(response: PaginatedList<ProgramEnrollmentsResponse>): number {
    return Math.min(
      response.pageNumber * this.filters.PageSize,
      response.totalCount,
    );
  }
  openYearFormDialog(enrollmentId: number) {
    this.matDialog
      .open(EditProgramEnrollmentComponent, {
        width: '600px',
        maxWidth: '90vw',
        data: {
          enrollmentId: enrollmentId,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadProgramEnrollments();
      });
  }
}
