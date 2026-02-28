import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BasePermissionService,
  Category,
  HttpErrorService,
  ParsedPermissions,
  PermissionService,
} from '@project-manara-frontend/services';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-department-staff-permissions-page',
  standalone: false,
  templateUrl: './department-staff-permissions-page.component.html',
  styleUrls: ['./department-staff-permissions-page.component.css'],
})
export class DepartmentStaffPermissionsPageComponent implements OnInit {
  data$!: Observable<ParsedPermissions>;
  departmentUserId: number;
  searchQuery = '';

  defaults: string[] = [];
  selected: string[] = [];
  original: string[] = [];
  categories: Category[] = [];

  constructor(
    private ps: PermissionService,
    private route: ActivatedRoute,
    private base: BasePermissionService,
    private toastrService: ToastrService,
    private httpErrorService: HttpErrorService,
  ) {
    this.departmentUserId = Number(
      this.route.parent?.snapshot.paramMap.get('id'),
    );
  }

  ngOnInit(): void {
    this.loadData();
  }
  private loadData(): void {
    this.data$ = this.ps.getUserPermissions(this.departmentUserId).pipe(
      tap((parsed) => {
        this.defaults = parsed.defaults;
        this.selected = [...parsed.active];
        this.original = [...parsed.active];
        this.categories = parsed.categories;
      }),
    );
  }

  get filteredCategories(): Category[] {
    return this.base.filterCategories(this.categories, this.searchQuery);
  }

  getVisiblePermissions(category: Category) {
    return this.base.getVisiblePermissions(category, this.searchQuery);
  }

  getSelectedCount(category: Category): number {
    return this.base.getSelectedCount(category, this.selected);
  }

  isSelected(key: string): boolean {
    return this.selected.includes(key);
  }

  toggle(key: string): void {
    this.selected = this.base.toggle(this.selected, key);
  }

  selectAll(): void {
    this.selected = this.base.selectAll(
      this.selected,
      this.categories,
      this.searchQuery,
    );
  }

  deselectAll(): void {
    this.selected = this.base.deselectAll(
      this.selected,
      this.categories,
      this.searchQuery,
    );
  }

  save(): void {
    this.ps
      .updateForUser(this.departmentUserId, this.defaults, this.selected)
      .subscribe({
        next: () => {
          this.original = [...this.selected];
          this.toastrService.success('Permissions updated successfully');
        },
        error: (error) => this.httpErrorService.handle(error),
      });
  }
}
