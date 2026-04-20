import { Component, OnInit } from '@angular/core';
import {
  RoleResponse,
  ScopeDetailResponse,
} from '@project-manara-frontend/models';
import { RoleService, ScopeService } from '@project-manara-frontend/services';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-roles-page',
  standalone: false,
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.css'],
})
export class RolesPageComponent implements OnInit {
  roles$!: Observable<RoleResponse[]>;
  isLoading: boolean = false;
  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.isLoading = true;
    this.roles$ = this.roleService
      .getAll(false)
      .pipe(finalize(() => (this.isLoading = false)));
  }
}
