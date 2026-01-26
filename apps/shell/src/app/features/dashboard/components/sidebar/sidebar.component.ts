import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  constructor() { }

  ngOnInit() { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
