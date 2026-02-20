import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FacultyUserResponse, PaginatedList, RequestFilters } from '@project-manara-frontend/models';
import { FacultyUserService, HttpErrorService } from '@project-manara-frontend/services';
import { filter, Observable, switchMap } from 'rxjs';
import { StaffFormDialogComponent } from '../../components/staff-form-dialog/staff-form-dialog.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staffs-page',
  standalone: false,
  templateUrl: './staffs-page.component.html',
  styleUrls: ['./staffs-page.component.css']
})
export class StaffsPageComponent implements OnInit {

  filters = new RequestFilters();
  staffs$!: Observable<PaginatedList<FacultyUserResponse>>;
  selectedStatus: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  facultyId;
  constructor(
    private route : ActivatedRoute,
    private httpErrorService: HttpErrorService,
    private facultyUserService: FacultyUserService,
    private dialog: MatDialog,
  ) {
    this.facultyId = Number(this.route.parent?.parent?.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadStaffs();
  }

  loadStaffs(): void {
    this.staffs$ = this.facultyUserService.getAll(this.facultyId, this.filters, this.selectedStatus)
  }

  onSearch(): void {
    this.filters.PageNumber = 1;
    this.loadStaffs();
  }

  onStatusFilter(): void {
    this.filters.PageNumber = 1;
    this.loadStaffs();
  }

  goToPage(page: number, totalPages: number): void {
    if (page < 1 || page > totalPages) return;
    this.filters.PageNumber = page;
    this.loadStaffs();
  }

  onPageSizeChange(): void {
    this.filters.PageNumber = 1;
    this.loadStaffs();
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

  getStartIndex(response: PaginatedList<FacultyUserResponse>): number {
    return (response.pageNumber - 1) * this.filters.PageSize + 1;
  }

  getEndIndex(response: PaginatedList<FacultyUserResponse>): number {
    return Math.min(response.pageNumber * this.filters.PageSize, response.totalCount);
  }

  onAddStaff(): void {
    const dialogRef = this.dialog.open(StaffFormDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      minHeight: '90vh',
      panelClass: 'staff-form-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadStaffs();
    });
  }

  onDelete(staff: FacultyUserResponse): void {
    this.facultyUserService.toggleStatus(staff.id).subscribe({
      next: () => {
        this.loadStaffs();
      },
      error: (errors) => {
        this.httpErrorService.handle(errors);
      }
    });
  }
}
