import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-header',
  standalone: false,
  templateUrl: './roles-header.html',
  styleUrl: './roles-header.css',
})
export class RolesHeader {
  constructor(private router: Router) {}

  goToCreateRole() {
    this.router.navigate(['/system-administration/roles/create-role']);
  }
}
