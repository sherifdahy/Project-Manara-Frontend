import { Component, OnInit } from '@angular/core';
import { RoleResponse } from '@project-manara-frontend/models';
import { RoleService } from '@project-manara-frontend/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-roles-page',
  standalone: false,
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.css']
})
export class RolesPageComponent implements OnInit {
  roles$!: Observable<RoleResponse[]>;
  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roles$ = this.roleService.getAll(false);
  }
}
