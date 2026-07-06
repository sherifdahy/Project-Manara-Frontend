import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone:false,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  ngOnInit(): void {}

  isSidebarCollapsed = false;

  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
