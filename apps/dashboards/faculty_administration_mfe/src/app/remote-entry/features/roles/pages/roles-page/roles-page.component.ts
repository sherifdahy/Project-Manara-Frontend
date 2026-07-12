import { Component, OnInit } from '@angular/core';
import { RoleResponse } from '@project-manara-frontend/models';
import { RoleService } from '@project-manara-frontend/services';
import { finalize, map, Observable, shareReplay } from 'rxjs';

interface RolesStats {
  total: number;
  active: number;
}

@Component({
  selector: 'app-roles-page',
  standalone: false,
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.css'],
})
export class RolesPageComponent implements OnInit {
  roles$!: Observable<RoleResponse[]>;
  rolesStats$!: Observable<RolesStats>;
  isLoading = false;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.isLoading = true;

    this.roles$ = this.roleService.getAll(false).pipe(
      finalize(() => (this.isLoading = false)),
      shareReplay(1),
    );

    this.rolesStats$ = this.roles$.pipe(
      map((roles) => ({
        total: roles.length,
        active: roles.filter((r) => !r.isDeleted).length,
      })),
    );
  }
}
