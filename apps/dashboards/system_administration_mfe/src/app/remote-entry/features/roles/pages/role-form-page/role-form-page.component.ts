import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleDetailResponse, RoleRequest } from '@project-manara-frontend/models';
import {
  BasePermissionService,
  Category,
  HttpErrorService,
  PermissionService,
  RoleService,
} from '@project-manara-frontend/services';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-form-page',
  standalone: false,
  templateUrl: './role-form-page.component.html',
  styleUrls: ['./role-form-page.component.css'],
})
export class RoleFormPageComponent implements OnInit {
  data$!: Observable<RoleDetailResponse>;
  roleId: number;
  searchQuery = '';

  roleData!: RoleDetailResponse;
  allPermissions: string[] = [];
  selected: string[] = [];
  original: string[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
    private permissionService: PermissionService,
    public base: BasePermissionService,
    private httpErrorService: HttpErrorService,
    private toastrService: ToastrService
  ) {
    this.roleId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.data$ = forkJoin({
      role: this.roleService.get(this.roleId),
      permissions: this.permissionService.getAll(),
    }).pipe(
      map(({ role, permissions }) => {
        // Store role data for save
        this.roleData = role;
        this.allPermissions = permissions;

        // Build categories from ALL system permissions
        const parsed = this.base.parse(permissions, []);
        this.categories = parsed.categories;

        // Selected = permissions the role currently has
        this.selected = [...role.permissions];
        this.original = [...role.permissions];

        return role;
      })
    );
  }

  // ========== Computed ==========

  get filteredCategories(): Category[] {
    return this.base.filterCategories(this.categories, this.searchQuery);
  }

  get hasChanges(): boolean {
    if (this.selected.length !== this.original.length) return true;
    const sortedSelected = [...this.selected].sort();
    const sortedOriginal = [...this.original].sort();
    return sortedSelected.some((val, i) => val !== sortedOriginal[i]);
  }

  // ========== Permission Helpers ==========

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
      this.searchQuery
    );
  }

  deselectAll(): void {
    this.selected = this.base.deselectAll(
      this.selected,
      this.categories,
      this.searchQuery
    );
  }

  // ========== Actions ==========

  save(): void {
    const request: RoleRequest = {
      name: this.roleData.name,
      code: this.roleData.code,
      description: this.roleData.description,
      permissions: this.selected,
    };

    this.roleService.update(this.roleId, request).subscribe({
      next: () => {
        this.original = [...this.selected];
        this.toastrService.success('Permissions updated successfully');
      },
      error: (error) => this.httpErrorService.handle(error),
    });
  }

  reset(): void {
    this.selected = [...this.original];
  }
}
