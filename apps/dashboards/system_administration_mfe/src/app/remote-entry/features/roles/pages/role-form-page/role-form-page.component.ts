import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  viewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RoleDetailResponse,
  RoleRequest,
} from '@project-manara-frontend/models';
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
  isEditMode: boolean;
  editedRoleId: number;
  @ViewChildren('check') checkButtons!: QueryList<ElementRef>;
  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {
    this.isEditMode = false;
    this.permissions = [''];
    this.roleName = '';
    this.roleDescription = '';
    this.isDeleted = false;
    this.roleReq = {
      name: this.roleName,
      permissions: this.permissions,
      description: this.roleDescription,
      isDeleted: this.isDeleted,
    };
    this.editedRoleId = 0;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editedRoleId = +id;
        this.isEditMode = true;
        this.loadRoleData(+id);
      }
      console.log(this.isEditMode);
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
    if (this.isEditMode) {
      // edit
      this.roleReq = {
        name: this.roleName,
        description: this.roleDescription,
        permissions: this.permissions.filter((p) => p),
      };
      console.log(this.roleReq);
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
    } else {
      // create
      this.roleReq = {
        name: this.roleName,
        description: this.roleDescription,
        isDeleted: this.isDeleted,
        permissions: this.permissions.filter((p) => p),
      };
      console.log(this.roleReq);
      this.roleService.create(this.roleReq).subscribe({
        next: (res) => {
          console.log('done');
          this.clearForm();
          this.goToRolesPage();
        },
        error: (err) => {
          console.log(
            'error when creating new role, ',
            err.error.errors.DuplicateRoleName[0],
          );
        },
      });
    }
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
  loadRoleData(id: number) {
    this.roleService.get(id).subscribe({
      next: (res) => {
        console.log('done');
        this.roleName = res.name;
        this.permissions = res.permissions;
        this.checkButtons.forEach((button) => {
          const el = button.nativeElement as HTMLInputElement;
          el.checked = this.permissions.includes(el.value);
        });
        this.roleDescription = res.description;
        this.isDeleted = res.isDeleted;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log('error when retrieving role details, ');
      },
    });
  }
}
