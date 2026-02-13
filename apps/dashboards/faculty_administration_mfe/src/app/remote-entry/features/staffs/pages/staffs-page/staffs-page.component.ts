import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FacultyUserResponse, ScopeDetailResponse } from '@project-manara-frontend/models';
import { FacultyUserService, ScopeService, UserService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StaffFormDialogComponent } from '../../components/staff-form-dialog/staff-form-dialog.component';

@Component({
  selector: 'app-staffs-page',
  standalone: false,
  templateUrl: './staffs-page.component.html',
  styleUrls: ['./staffs-page.component.css']
})
export class StaffsPageComponent implements OnInit {
  staffs$!: Observable<FacultyUserResponse[]>;
  filteredStaffs: FacultyUserResponse[] = [];
  availableRoles: string[] = [];

  // Filters
  searchTerm: string = '';
  selectedRole: string = '';
  selectedStatus: string = '';

  // Stats
  activeCount: number = 0;
  inactiveCount: number = 0;
  rolesCount: number = 0;

  // Pagination (شكل بس)
  currentPage: number = 1;
  pageSize: number = 10;
  totalStaffs: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  startIndex: number = 0;
  endIndex: number = 0;

  private allStaffs: FacultyUserResponse[] = [];
  private avatarColors = ['blue', 'green', 'orange', 'purple', 'red', 'teal', 'pink'];

  constructor(
    private facultyUserService: FacultyUserService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadStaffs();
  }

  loadStaffs() {
    this.staffs$ = this.facultyUserService.getAll(1).pipe(
      tap(staffs => {
        this.allStaffs = staffs;
        this.extractAvailableRoles();
        this.calculateStats();
        this.applyFilters();
      })
    );
  }

  // =====================
  // Stats
  // =====================
  private calculateStats(): void {
    this.activeCount = this.allStaffs.filter(s => !s.isDeleted && !s.isDisabled).length;
    this.inactiveCount = this.allStaffs.filter(s => s.isDeleted || s.isDisabled).length;
    this.rolesCount = this.availableRoles.length;
  }

  // =====================
  // Extract unique roles from all staff
  // =====================
  private extractAvailableRoles(): void {
    const rolesSet = new Set<string>();
    this.allStaffs.forEach(staff => {
      staff.roles?.forEach(role => rolesSet.add(role));
    });
    this.availableRoles = Array.from(rolesSet).sort();
  }

  // =====================
  // Filters
  // =====================
  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.applyFilters();
  }

  onRoleFilter(role: string): void {
    this.selectedRole = role;
    this.currentPage = 1;
    this.applyFilters();
  }

  onStatusFilter(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 1;
    this.applyFilters();
  }

  private applyFilters(): void {
    let result = [...this.allStaffs];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(staff =>
        staff.name?.toLowerCase().includes(term) ||
        staff.email?.toLowerCase().includes(term) ||
        staff.phone?.includes(term) ||
        staff.ssn?.includes(term)
      );
    }

    // Role filter
    if (this.selectedRole) {
      result = result.filter(staff =>
        staff.roles?.includes(this.selectedRole)
      );
    }

    // Status filter
    if (this.selectedStatus) {
      if (this.selectedStatus === 'active') {
        result = result.filter(staff => !staff.isDeleted && !staff.isDisabled);
      } else if (this.selectedStatus === 'disabled') {
        result = result.filter(staff => staff.isDisabled && !staff.isDeleted);
      } else if (this.selectedStatus === 'deleted') {
        result = result.filter(staff => staff.isDeleted);
      }
    }

    // Totals
    this.totalStaffs = result.length;
    this.totalPages = Math.ceil(this.totalStaffs / this.pageSize) || 1;

    // Pagination slice
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize, this.totalStaffs);
    this.filteredStaffs = result.slice(this.startIndex, this.endIndex);

    this.generatePages();
  }

  // =====================
  // Pagination
  // =====================
  private generatePages(): void {
    this.pages = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  // =====================
  // Actions
  // =====================

  onAddStaff() {
    let dialogRef = this.dialog.open(StaffFormDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      minHeight: '90vh',
      panelClass: 'staff-form-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStaffs();
      }
    });
  }

  /** Toggle Disable / Enable */
  onToggleDisable(staff: FacultyUserResponse): void {

  }

  /** Delete Staff */
  onDelete(staff: FacultyUserResponse): void {

  }



  // =====================
  // Helpers
  // =====================
  getInitials(name: string): string {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }

  getAvatarColor(name: string): string {
    if (!name) return this.avatarColors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.avatarColors[Math.abs(hash) % this.avatarColors.length];
  }

  getStaffStatus(staff: FacultyUserResponse): { label: string; class: string } {
    if (staff.isDeleted) {
      return { label: 'Deleted', class: 'status-deleted' };
    }
    if (staff.isDisabled) {
      return { label: 'Disabled', class: 'status-inactive' };
    }
    return { label: 'Active', class: 'status-active' };
  }
}
