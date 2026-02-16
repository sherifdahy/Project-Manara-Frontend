import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacultyRoleResponse, PermissionsRequest } from '@project-manara-frontend/models';
import { PermissionService, RoleService } from '@project-manara-frontend/services';
import { Observable, tap } from 'rxjs';


interface Permission {
  key: string;
  name: string;
}

interface Category {
  name: string;
  expanded: boolean;
  permissions: Permission[];
}

@Component({
  selector: 'app-staff-permissions-page',
  standalone: false,
  templateUrl: './staff-permissions-page.component.html',
  styleUrls: ['./staff-permissions-page.component.css']
})
export class StaffPermissionsPageComponent implements OnInit {

  data$!: Observable<FacultyRoleResponse>;
  roleId!: number;

  private defaultPermissionKeys: string[] = [];

  selectedPermissions: string[] = [];
  originalPermissions: string[] = [];

  searchQuery = '';
  allPermissions: Permission[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
    private permissionService: PermissionService
  ) {
    this.roleId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadData();
  }

  // =====================
  // Load Data
  // =====================
  private loadData(): void {
    this.data$ = this.roleService.getFacultyRole(1, this.roleId).pipe(
      tap((data: FacultyRoleResponse) => {
        const defaults = data.defaultPermissions || [];
        const overrides = data.overridePermissions || [];

        // Store defaults for later
        this.defaultPermissionKeys = [...defaults];

        // Active permissions = defaults MINUS overrides (removed ones)
        const activePermissions = defaults.filter(p => !overrides.includes(p));

        this.selectedPermissions = [...activePermissions];
        this.originalPermissions = [...activePermissions];

        // Build categories from ALL default permissions
        this.buildCategories(defaults);
      })
    );
  }

  // =====================
  // Build Categories
  // =====================
  private buildCategories(permissionKeys: string[]): void {
    const groupMap = new Map<string, Permission[]>();

    permissionKeys.forEach(key => {
      const colonIndex = key.indexOf(':');
      if (colonIndex === -1) return;

      const group = key.substring(0, colonIndex);
      const action = key.substring(colonIndex + 1);
      const groupKey = group.toLowerCase();

      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, []);
      }

      groupMap.get(groupKey)!.push({
        key,
        name: this.formatActionName(action)
      });
    });

    this.categories = Array.from(groupMap.entries()).map(([_, permissions]) => {
      const firstKey = permissions[0].key;
      const group = firstKey.substring(0, firstKey.indexOf(':'));

      return {
        name: this.formatGroupName(group),
        expanded: false,
        permissions
      };
    });

    if (this.categories.length > 0) {
      this.categories[0].expanded = true;
    }

    this.allPermissions = this.categories.flatMap(c => c.permissions);
  }

  // =====================
  // Format Helpers
  // =====================
  private formatGroupName(group: string): string {
    return group
      .replace(/([A-Z])/g, ' \$1')
      .replace(/^./, s => s.toUpperCase())
      .trim();
  }

  private formatActionName(action: string): string {
    return action
      .replace(/([A-Z])/g, ' \$1')
      .replace(/^./, s => s.toUpperCase())
      .trim();
  }

  // =====================
  // Filtering
  // =====================
  get filteredCategories(): Category[] {
    if (!this.searchQuery.trim()) return this.categories;

    return this.categories.filter(cat =>
      this.getVisiblePermissions(cat).length > 0
    );
  }

  getVisiblePermissions(category: Category): Permission[] {
    if (!this.searchQuery.trim()) return category.permissions;

    const q = this.searchQuery.toLowerCase();
    return category.permissions.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.key.toLowerCase().includes(q) ||
      category.name.toLowerCase().includes(q)
    );
  }

  // =====================
  // Selection
  // =====================
  isSelected(key: string): boolean {
    return this.selectedPermissions.includes(key);
  }

  toggle(key: string): void {
    const i = this.selectedPermissions.indexOf(key);
    if (i > -1) {
      this.selectedPermissions.splice(i, 1);
    } else {
      this.selectedPermissions.push(key);
    }
  }

  getSelectedCount(category: Category): number {
    return category.permissions.filter(p => this.isSelected(p.key)).length;
  }

  selectAll(): void {
    const visible = this.filteredCategories
      .flatMap(c => this.getVisiblePermissions(c))
      .map(p => p.key);

    visible.forEach(key => {
      if (!this.isSelected(key)) {
        this.selectedPermissions.push(key);
      }
    });
  }

  deselectAll(): void {
    const visible = this.filteredCategories
      .flatMap(c => this.getVisiblePermissions(c))
      .map(p => p.key);

    this.selectedPermissions = this.selectedPermissions.filter(
      key => !visible.includes(key)
    );
  }

  // =====================
  // Changes Detection
  // =====================
  hasChanges(): boolean {
    if (this.selectedPermissions.length !== this.originalPermissions.length) return true;
    return !this.selectedPermissions.every(p => this.originalPermissions.includes(p));
  }

  // =====================
  // Save
  // overridePermissions = defaults MINUS selected (the unchecked ones)
  // =====================
  save(): void {
    if (!this.hasChanges()) return;

    // Calculate what to send: permissions that user UNCHECKED (removed)
    const overridePermissions = this.defaultPermissionKeys.filter(
      p => !this.selectedPermissions.includes(p)
    );

    const request: PermissionsRequest = {
      claimValues: overridePermissions
    };

    this.permissionService.updateForFaculty(this.roleId, 1, request)
      .subscribe({
        next: () => {
          this.originalPermissions = [...this.selectedPermissions];
        },
        error: (error) => {
          console.error('Error saving permissions:', error);
        }
      });
  }
}
