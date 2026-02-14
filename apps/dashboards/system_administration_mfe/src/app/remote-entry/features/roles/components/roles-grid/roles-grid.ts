import { ScopesService } from '../../../../../../../../../../libs/services/src/lib/scopes/scopes.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RoleService } from 'libs/services/src/lib/roles/role.service';
import { RoleResponse } from '@project-manara-frontend/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-grid',
  templateUrl: './roles-grid.html',
  standalone: false,
  styleUrls: ['./roles-grid.css'],
})
export class RolesGrid implements OnInit {
  systemRoles: RoleResponse[];
  filteredSystemRoles: RoleResponse[];
  rolesStatus: string;
  rolesScope: string;
  constructor(
    private roleService: RoleService,
    private scopeService: ScopesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.systemRoles = [];
    this.filteredSystemRoles = [];
    this.rolesStatus = 'inActive';
    this.rolesScope = 'All';
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(status: boolean = true): void {
    this.roleService.getAll(status).subscribe({
      next: (res: RoleResponse[]) => {
        this.systemRoles = res;
        this.filteredSystemRoles = this.systemRoles;
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

  deleteRole(id: number) {
    this.roleService.toggleStatus(id).subscribe({
      next: (res) => {
        console.log('role is deleted');
        this.getRoles();
      },
      error: (err) => {
        console.log('error when deleting new role');
      },
    });
  }

  updateRole(id: number) {
    this.router.navigate([`/system-administration/roles/edit-role/${id}`]);
  }

  filterRolesStatus() {
    if (this.rolesStatus === 'active') {
      console.log(this.rolesStatus);
      this.filteredSystemRoles = this.systemRoles.filter(
        (role) => role.isDeleted === false,
      );
    } else {
      this.filteredSystemRoles = this.systemRoles.filter(
        (role) => role.isDeleted === false || role.isDeleted === true,
      );
    }
  }
  filterRolesScope() {
    this.rolesStatus = 'inActive';
    if (this.rolesScope === 'All') {
      this.getRoles(this.rolesStatus === 'inActive');
    } else {
      this.scopeService.getByName(this.rolesScope).subscribe({
        next: (res: any) => {
          this.systemRoles = res.roles;
          this.filteredSystemRoles = this.systemRoles;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this.cdr.detectChanges();
        },
      });
    }
  }
}
