import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BasePermissionService,
  Category,
  ParsedPermissions,
  PermissionService,
} from '@project-manara-frontend/services';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-staff-permissions-page',
  standalone: false,
  templateUrl: './staff-permissions-page.component.html',
  styleUrls: ['./staff-permissions-page.component.css'],
})
export class StaffPermissionsPageComponent implements OnInit {
  data$!: Observable<ParsedPermissions>;
  facultyUserId: number;
  searchQuery = '';

  defaults: string[] = [];
  selected: string[] = [];
  original: string[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    public basePermissionService: BasePermissionService
  ) {
    this.facultyUserId = Number(
      this.route.parent?.snapshot.paramMap.get('id')
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.data$ = this.permissionService.getUserPermissions(this.facultyUserId).pipe(
      tap((parsed) => {
        this.defaults = parsed.defaults;
        this.selected = [...parsed.active];
        this.original = [...parsed.active];
        this.categories = parsed.categories;
      })
    );
  }

  get filteredCategories(): Category[] {
    return this.basePermissionService.filterCategories(this.categories, this.searchQuery);
  }

  getVisiblePermissions(category: Category) {
    return this.basePermissionService.getVisiblePermissions(category, this.searchQuery);
  }

  getSelectedCount(category: Category): number {
    return this.basePermissionService.getSelectedCount(category, this.selected);
  }

  isSelected(key: string): boolean {
    return this.selected.includes(key);
  }


  toggle(key: string): void {
    this.selected = this.basePermissionService.toggle(this.selected, key);
  }

  selectAll(): void {
    this.selected = this.basePermissionService.selectAll(this.selected, this.categories, this.searchQuery);
  }

  deselectAll(): void {
    this.selected = this.basePermissionService.deselectAll(this.selected, this.categories, this.searchQuery);
  }

  save(): void {
    this.permissionService.updateForUser(this.facultyUserId, this.defaults, this.selected)
      .subscribe({
        next: () => (this.original = [...this.selected]),
        error: (error) => console.error('Failed to save', error),
      });
  }
}
