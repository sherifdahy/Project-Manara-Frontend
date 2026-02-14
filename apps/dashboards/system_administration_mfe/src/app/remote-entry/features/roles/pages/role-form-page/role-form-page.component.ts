import { PermissionRes } from './../../../../../../../../../../libs/models/src/lib/permissions/permission-res';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleRequest } from '@project-manara-frontend/models';
import {
  PermessionService,
  RoleService,
} from '@project-manara-frontend/services';

@Component({
  selector: 'app-role-form-page',
  templateUrl: './role-form-page.component.html',
  standalone: false,
  styleUrls: ['./role-form-page.component.css'],
})
export class RoleFormPageComponent implements OnInit {
  permissions: string[];
  permissions2: string[];
  permissions3: PermissionRes;
  roleName: string;
  roleCode: string;
  roleDescription: string;
  roleReq: RoleRequest;
  isEditMode: boolean;
  editedRoleId: number;
  @ViewChildren('check') checkButtons!: QueryList<ElementRef>;
  constructor(
    private roleService: RoleService,
    private permessionService: PermessionService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {
    this.isEditMode = false;
    this.permissions = [''];
    this.permissions2 = [];
    this.permissions3 = {
      roles: [],
      universities: [],
      permissions: [],
      faculties: [],
      departments: [],
      programs: [],
      facultyusers: [],
      universityusers: [],
      scopes: [],
    };
    this.roleName = '';
    this.roleCode = '';
    this.roleDescription = '';
    this.roleReq = {
      name: this.roleName,
      code: this.roleCode,
      permissions: this.permissions,
      description: this.roleDescription,
    };
    this.editedRoleId = 0;
  }

  ngOnInit() {
    this.permessionService.getAll().subscribe({
      next: (res: string[]) => {
        this.permissions2 = res;
        this.permissions3 = this.arrayToObj(this.permissions2);
      },
      error: (err) => {
        console.log('error when get permessions');
      },
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editedRoleId = +id;
        this.loadRoleData(this.editedRoleId);
      }
    });
  }

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

  submit() {
    this.roleReq = {
      name: this.roleName,
      code: this.roleCode,
      description: this.roleDescription,
      permissions: this.permissions.filter((p) => p),
    };
    this.roleReq;
    this.roleService.update(this.editedRoleId, this.roleReq).subscribe({
      next: (res) => {
        console.log('done');
        this.clearForm();
        this.goToRolesPage();
      },
      error: (err) => {
        console.log('error when updating role, ');
      },
    });
  }

  clearForm() {
    this.roleName = '';
    this.roleCode = '';
    this.roleDescription = '';
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
  loadRoleData(id: number) {
    this.roleService.get(id).subscribe({
      next: (res) => {
        this.roleName = res.name;
        this.roleCode = res.code;
        this.permissions = res.permissions;
        this.checkButtons.forEach((button) => {
          const el = button.nativeElement as HTMLInputElement;
          el.checked = this.permissions.includes(el.value);
        });

        this.roleDescription = res.description;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log('error when retrieving role details, ');
      },
    });
  }

  arrayToObj(arr: string[]): any {
    const obj: Record<string, string[]> = {};

    arr.forEach((item) => {
      const [key, value] = item.split(':');
      const keyLower = key.toLowerCase();
      if (!obj[keyLower]) {
        obj[keyLower] = [];
      }
      obj[keyLower].push(value);
    });

    return obj;
  }
}
