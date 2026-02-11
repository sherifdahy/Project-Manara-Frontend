import { Component, OnInit } from '@angular/core';
import { UserService } from '@project-manara-frontend/services';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit() { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
