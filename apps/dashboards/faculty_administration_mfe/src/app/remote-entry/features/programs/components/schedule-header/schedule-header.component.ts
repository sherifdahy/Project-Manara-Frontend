import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule-header',
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.css'],
  standalone: false,
})
export class ScheduleHeaderComponent {
  @Output() reset = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}