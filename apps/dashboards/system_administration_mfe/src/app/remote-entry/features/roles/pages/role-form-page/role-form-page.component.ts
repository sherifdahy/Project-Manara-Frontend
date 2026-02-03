import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleRequest } from '@project-manara-frontend/models';
import { RoleService } from '@project-manara-frontend/services';

@Component({
  selector: 'app-role-form-page',
  templateUrl: './role-form-page.component.html',
  standalone: false,
  styleUrls: ['./role-form-page.component.css'],
})
export class RoleFormPageComponent implements OnInit {
  permissions: string[];
  roleName: string;
  roleDescription: string;
  isDeleted: boolean;
  roleReq: RoleRequest;
  constructor(
    private roleService: RoleService,
    private router: Router,
  ) {
    this.permissions = [''];
    this.roleName = '';
    this.roleDescription = '';
    this.isDeleted = true;
    this.roleReq = {
      name: this.roleName,
      permissions: this.permissions,
    };
  }

  ngOnInit() {}

  selectAll(card: HTMLElement) {
    const checkboxes = card.querySelectorAll(
      'input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((cb) => {
      cb.checked = true;
      this.addPermission(cb.value);
    });
  }

  clearAll(card: HTMLElement) {
    const checkboxes = card.querySelectorAll(
      'input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((cb) => {
      cb.checked = false;
      this.removePermission(cb.value);
    });
  }
  onPermissionChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.addPermission(checkbox.value);
    } else {
      this.removePermission(checkbox.value);
    }
  }

  addPermission(value: string) {
    if (!this.permissions.includes(value)) {
      this.permissions.push(value);
    }
  }

  removePermission(value: string) {
    this.permissions = this.permissions.filter((p) => p !== value);
  }

  createRole() {
    this.roleReq = {
      name: this.roleName,
      permissions: this.permissions.filter((p) => p),
    };
    this.permissions = [''];
    this.roleName = '';
    console.log(this.roleReq);
    this.roleService.create(this.roleReq).subscribe({
      next: (res) => {
        console.log('done');
      },
      error: (err) => {
        console.log('error when creating new role');
      },
    });
    this.clearForm();
    this.goToRolesPage();
  }

  clearForm() {
    this.roleName = '';
    this.roleDescription = '';
    this.isDeleted = true;
    this.permissions = [];

    const allCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;
    allCheckboxes.forEach((cb) => (cb.checked = false));
    this.goToRolesPage();
  }

  goToRolesPage() {
    this.router.navigate(['/system-administration/roles']);
  }
}
