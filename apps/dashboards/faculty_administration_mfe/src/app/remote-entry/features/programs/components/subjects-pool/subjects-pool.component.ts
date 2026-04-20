import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ScheduleEntry } from '@project-manara-frontend/view-models';

@Component({
  selector: 'app-subjects-pool',
  templateUrl: './subjects-pool.component.html',
  styleUrls: ['./subjects-pool.component.css'],
  standalone: false,
})
export class SubjectsPoolComponent {
  @Input() poolId!: string;
  @Input() entries: ScheduleEntry[] = [];

  @Output() search = new EventEmitter<string>();
  @Output() dropped = new EventEmitter<CdkDragDrop<ScheduleEntry[]>>();

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }

  onDrop(event: CdkDragDrop<ScheduleEntry[]>): void {
    this.dropped.emit(event);
  }

  trackByUid(_: number, entry: ScheduleEntry): string {
    return entry.uid;
  }
}