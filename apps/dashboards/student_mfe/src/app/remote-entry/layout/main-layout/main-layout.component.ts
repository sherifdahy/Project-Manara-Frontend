import { Component } from '@angular/core';
import { StudentsService } from '../../../../../../../../libs/services/src/lib/students/students.service';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  constructor(studentsService: StudentsService) {
    studentsService.me().subscribe();
  }
  ngOnInit(): void {}

  isSidebarCollapsed = false;

  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
