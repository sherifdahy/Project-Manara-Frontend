import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone : false,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent  {

  isSidebarCollapsed = false;

  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
