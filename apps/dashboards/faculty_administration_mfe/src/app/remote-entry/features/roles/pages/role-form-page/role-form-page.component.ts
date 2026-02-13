import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleDetailResponse } from '@project-manara-frontend/models';
import { RoleService } from '@project-manara-frontend/services';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-role-form-page',
  standalone: false,
  templateUrl: './role-form-page.component.html',
  styleUrls: ['./role-form-page.component.css']
})
export class RoleFormPageComponent implements OnInit {

  role$!: Observable<RoleDetailResponse>;
  roleId!: number;

  // Placeholder data for UI (not from backend)
  roleMetadata: any = {
    icon: 'fa-user-shield',
    color: '#2563eb',
    bgColor: 'rgba(37, 99, 235, 0.1)',
    level: 'Super (University)',
    levelBadgeClass: 'badge-info',
    description: 'University-level management and oversight',
    usersCount: 0, // Placeholder - can be fetched from another endpoint
    defaultPortal: 'Admin'
  };

  // Permissions from backend
  selectedPermissions: string[] = [];
  originalPermissions: string[] = [];

  searchQuery = '';
  allPermissions: any[] = [];
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService
  ) {
    this.roleId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.buildPermissions();
    this.loadRole();
  }

  // Load role from API
  loadRole(): void {
    this.role$ = this.roleService.get(this.roleId).pipe(
      tap((role: RoleDetailResponse) => {
        // Set selected permissions from backend
        this.selectedPermissions = [...role.permissions];
        this.originalPermissions = [...role.permissions];

        // You can update metadata based on role name if needed
        this.updateRoleMetadata(role.name);
      })
    );
  }

  // Update metadata based on role name (optional)
  updateRoleMetadata(roleName: string): void {
    const roleMetadataMap: any = {
      'System Admin': {
        icon: 'fa-shield-halved',
        color: '#dc2626',
        bgColor: 'rgba(220, 38, 38, 0.1)',
        level: 'Super (System)',
        levelBadgeClass: 'badge-danger',
        description: 'Full system access with all permissions',
        defaultPortal: 'Admin'
      },
      'University Admin': {
        icon: 'fa-user-shield',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.1)',
        level: 'Super (University)',
        levelBadgeClass: 'badge-info',
        description: 'University-level management and oversight',
        defaultPortal: 'Admin'
      },
      'Faculty Admin': {
        icon: 'fa-user-tie',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.1)',
        level: 'Average (Faculty)',
        levelBadgeClass: 'badge-info',
        description: 'Faculty-level administration',
        defaultPortal: 'Staff'
      }
      // Add more as needed
    };

    if (roleMetadataMap[roleName]) {
      this.roleMetadata = { ...this.roleMetadata, ...roleMetadataMap[roleName] };
    }
  }

  // Build all available permissions
  buildPermissions(): void {
    this.categories = [
      {
        id: 'roles',
        name: 'Role Management',
        expanded: true,
        permissions: [
          { key: 'roles:read', name: 'View Roles', desc: 'View all system roles' },
          { key: 'roles:create', name: 'Create Roles', desc: 'Create new roles' },
          { key: 'roles:update', name: 'Update Roles', desc: 'Modify role settings' },
          { key: 'roles:toggleStatus', name: 'Toggle Role Status', desc: 'Enable/disable roles' }
        ]
      },
      {
        id: 'permissions',
        name: 'Permission Management',
        icon: 'fa-key',
        expanded: true,
        permissions: [
          { key: 'permissions:create', name: 'Create Permissions', desc: 'Create new permissions' },
          { key: 'permissions:toggleStatus', name: 'Toggle Permission Status', desc: 'Enable/disable permissions' }
        ]
      },
      {
        id: 'universities',
        name: 'University Management',
        icon: 'fa-building-columns',
        expanded: true,
        permissions: [
          { key: 'universities:read', name: 'View Universities', desc: 'View university information' },
          { key: 'universities:create', name: 'Create Universities', desc: 'Create new universities' },
          { key: 'universities:update', name: 'Update Universities', desc: 'Modify university details' },
          { key: 'universities:toggleStatus', name: 'Toggle University Status', desc: 'Enable/disable universities' }
        ]
      },
      {
        id: 'faculties',
        name: 'Faculty Management',
        icon: 'fa-building',
        expanded: true,
        permissions: [
          { key: 'faculties:read', name: 'View Faculties', desc: 'View faculty information' },
          { key: 'faculties:create', name: 'Create Faculties', desc: 'Create new faculties' },
          { key: 'faculties:update', name: 'Update Faculties', desc: 'Modify faculty details' },
          { key: 'faculties:toggleStatus', name: 'Toggle Faculty Status', desc: 'Enable/disable faculties' }
        ]
      },
      {
        id: 'departments',
        name: 'Department Management',
        icon: 'fa-sitemap',
        expanded: false,
        permissions: [
          { key: 'departments:read', name: 'View Departments', desc: 'View department information' },
          { key: 'departments:create', name: 'Create Departments', desc: 'Create new departments' },
          { key: 'departments:update', name: 'Update Departments', desc: 'Modify department details' },
          { key: 'departments:toggleStatus', name: 'Toggle Department Status', desc: 'Enable/disable departments' }
        ]
      },
      {
        id: 'programs',
        name: 'Program Management',
        icon: 'fa-graduation-cap',
        expanded: false,
        permissions: [
          { key: 'programs:read', name: 'View Programs', desc: 'View academic programs' },
          { key: 'programs:create', name: 'Create Programs', desc: 'Create new programs' },
          { key: 'programs:update', name: 'Update Programs', desc: 'Modify program details' },
          { key: 'programs:toggleStatus', name: 'Toggle Program Status', desc: 'Enable/disable programs' }
        ]
      },
      {
        id: 'users',
        name: 'User Management',
        icon: 'fa-users',
        expanded: false,
        permissions: [
          { key: 'users:read', name: 'View Users', desc: 'View all system users' },
          { key: 'users:create', name: 'Create Users', desc: 'Create new user accounts' },
          { key: 'users:update', name: 'Update Users', desc: 'Modify user information' },
          { key: 'users:delete', name: 'Delete Users', desc: 'Remove users from system' },
          { key: 'users:toggleStatus', name: 'Toggle User Status', desc: 'Enable/disable user accounts' },
          { key: 'users:assignRoles', name: 'Assign Roles', desc: 'Assign roles to users' },
          { key: 'users:resetPassword', name: 'Reset Password', desc: 'Reset user passwords' }
        ]
      },
      {
        id: 'students',
        name: 'Student Management',
        icon: 'fa-user-graduate',
        expanded: false,
        permissions: [
          { key: 'students:read', name: 'View Students', desc: 'View student records' },
          { key: 'students:create', name: 'Enroll Students', desc: 'Enroll new students' },
          { key: 'students:update', name: 'Update Students', desc: 'Modify student information' },
          { key: 'students:delete', name: 'Delete Students', desc: 'Remove student records' },
          { key: 'students:viewGrades', name: 'View Grades', desc: 'View student grades' },
          { key: 'students:modifyGrades', name: 'Modify Grades', desc: 'Edit student grades' }
        ]
      },
      {
        id: 'courses',
        name: 'Course Management',
        icon: 'fa-book-open',
        expanded: false,
        permissions: [
          { key: 'courses:read', name: 'View Courses', desc: 'View all courses' },
          { key: 'courses:create', name: 'Create Courses', desc: 'Create new courses' },
          { key: 'courses:update', name: 'Update Courses', desc: 'Modify course information' },
          { key: 'courses:delete', name: 'Delete Courses', desc: 'Remove courses' },
          { key: 'courses:assignInstructors', name: 'Assign Instructors', desc: 'Assign instructors to courses' }
        ]
      },
      {
        id: 'reports',
        name: 'Reports & Analytics',
        icon: 'fa-chart-line',
        expanded: false,
        permissions: [
          { key: 'reports:read', name: 'View Reports', desc: 'Access system reports' },
          { key: 'reports:generate', name: 'Generate Reports', desc: 'Generate custom reports' },
          { key: 'reports:export', name: 'Export Data', desc: 'Export data to files' }
        ]
      },
      {
        id: 'settings',
        name: 'System Settings',
        icon: 'fa-cog',
        expanded: false,
        permissions: [
          { key: 'settings:read', name: 'View Settings', desc: 'View system settings' },
          { key: 'settings:update', name: 'Update Settings', desc: 'Modify system configuration' },
          { key: 'settings:managePermissions', name: 'Manage Permissions', desc: 'Manage role permissions' }
        ]
      }
    ];

    this.allPermissions = this.categories.flatMap(c => c.permissions);
  }

  getCategoryPermissions(category: any) {
    if (!this.searchQuery) return category.permissions;

    const query = this.searchQuery.toLowerCase();
    return category.permissions.filter((p: any) =>
      p.name.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query)
    );
  }

  isSelected(key: string): boolean {
    return this.selectedPermissions.includes(key);
  }

  toggle(key: string): void {
    const index = this.selectedPermissions.indexOf(key);
    if (index > -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(key);
    }
  }

  getSelectedCount(category: any): number {
    return category.permissions.filter((p: any) => this.isSelected(p.key)).length;
  }

  selectAll(): void {
    const filtered = this.categories
      .flatMap(c => this.getCategoryPermissions(c))
      .map((p: any) => p.key);

    filtered.forEach(key => {
      if (!this.isSelected(key)) {
        this.selectedPermissions.push(key);
      }
    });
  }

  deselectAll(): void {
    const filtered = this.categories
      .flatMap(c => this.getCategoryPermissions(c))
      .map((p: any) => p.key);

    this.selectedPermissions = this.selectedPermissions.filter(
      key => !filtered.includes(key)
    );
  }

  hasChanges(): boolean {
    if (this.selectedPermissions.length !== this.originalPermissions.length) {
      return true;
    }
    return !this.selectedPermissions.every(p => this.originalPermissions.includes(p));
  }

  save(): void {
    if (!this.hasChanges()) {
      alert('⚠️ No changes to save');
      return;
    }

    console.log('Saving permissions for role:', this.roleId);
    console.log('Selected permissions:', this.selectedPermissions);

    // Call backend API to update permissions
    // this.roleService.update(this.roleId, this.selectedPermissions).subscribe({
    //   next: () => {
    //     alert(`✅ Successfully saved ${this.selectedPermissions.length} permissions`);
    //     this.originalPermissions = [...this.selectedPermissions];
    //     this.router.navigate(['/roles']);
    //   },
    //   error: (error) => {
    //     console.error('Error saving permissions:', error);
    //     alert('❌ Failed to save permissions. Please try again.');
    //   }
    // });
  }
}
