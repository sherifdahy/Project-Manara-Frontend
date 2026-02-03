import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RoleService } from 'libs/services/src/lib/roles/role.service';
import { RoleResponse } from '@project-manara-frontend/models';

@Component({
  selector: 'app-roles-grid',
  templateUrl: './roles-grid.html',
  standalone: false,
  styleUrls: ['./roles-grid.css'],
})
export class RolesGrid implements OnInit {
  systemRoles: RoleResponse[];

  constructor(
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
  ) {
    this.systemRoles = [];
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getAll(true).subscribe({
      next: (res) => {
        this.systemRoles = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading roles', err);
        this.cdr.detectChanges();
      },
    });
  }
  getRoleClass(roleValue: string): string {
    return (
      'role-' +
      roleValue
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    );
  }
}
