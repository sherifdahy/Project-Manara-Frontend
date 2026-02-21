import { Component, OnInit } from '@angular/core';
import { RoleResponse, ScopeResponse } from '@project-manara-frontend/models';
import { HttpErrorService, RoleService, ScopeService } from '@project-manara-frontend/services';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-roles-page',
  standalone: false,
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.css'],
})
export class RolesPageComponent implements OnInit {

  includeDisabled = false;
  rolesScope = 'All';
  roles$!: Observable<RoleResponse[]>;
  scopes$!: Observable<ScopeResponse[]>;

  constructor(
    private roleService: RoleService,
    private scopeService: ScopeService,
    private httpErrorService: HttpErrorService,
  ) { }

  ngOnInit(): void {
    this.loadScopes();
    this.loadRoles();
  }

  loadScopes(): void {
    this.scopes$ = this.scopeService.getAll().pipe(shareReplay(1));
  }

  loadRoles(): void {
    this.roles$ = this.roleService.getAll(this.includeDisabled).pipe(shareReplay(1));
  }

  onIncludeDisabledChange(): void {
    if (this.rolesScope === 'All') {
      this.loadRoles();
    } else {
      this.loadByScope();
    }
  }

  onScopeChange(): void {
    if (this.rolesScope === 'All') {
      this.loadRoles();
    } else {
      this.loadByScope();
    }
  }

  private loadByScope(): void {
    this.roles$ = this.scopeService.get(this.rolesScope).pipe(
      map(scope => {
        if (!this.includeDisabled) {
          return scope.roles.filter(r => !r.isDeleted);
        }
        return scope.roles;
      }),
      shareReplay(1)
    );
  }

  toggleRoleStatus(id: number): void {
    this.roleService.toggleStatus(id).subscribe({
      next: () => {
        if (this.rolesScope === 'All') {
          this.loadRoles();
        } else {
          this.loadByScope();
        }
      },
      error: (err) => {
        this.httpErrorService.handle(err);
      },
    });
  }
}
