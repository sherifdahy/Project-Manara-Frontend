// components/schedule-grid/schedule-grid.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { DayResponse } from '@project-manara-frontend/models';
import { ScheduleEntry, SlotCell, PeriodItem } from '@project-manara-frontend/view-models';

@Component({
  selector: 'app-schedule-grid',
  templateUrl: './schedule-grid.component.html',
  styleUrls: ['./schedule-grid.component.css'],
  standalone: false,
})
export class ScheduleGridComponent {
  @Input() days: DayResponse[] = [];
  @Input() periods: PeriodItem[] = [];  // ← اتغير
  @Input() slotGrid: SlotCell[][] = [];
  @Input() canUndo = false;

  @Input() getDropPredicate!: (
    di: number,
    ti: number,
  ) => (drag: CdkDrag, drop: CdkDropList) => boolean;

  @Output() dropToCell = new EventEmitter<{
    event: CdkDragDrop<ScheduleEntry[]>;
    dayIndex: number;
    timeIndex: number;
  }>();

  @Output() dragEnterCell = new EventEmitter<{
    dayIndex: number;
    timeIndex: number;
  }>();

  @Output() dragLeaveCell = new EventEmitter<{
    dayIndex: number;
    timeIndex: number;
  }>();

  @Output() undo = new EventEmitter<void>();

  @Output() slotClicked = new EventEmitter<{
    entry: ScheduleEntry;
    dayIndex: number;
    timeIndex: number;
  }>();

  onDrop(
    event: CdkDragDrop<ScheduleEntry[]>,
    di: number,
    ti: number,
  ): void {
    this.dropToCell.emit({ event, dayIndex: di, timeIndex: ti });
  }

  onEnter(di: number, ti: number): void {
    this.dragEnterCell.emit({ dayIndex: di, timeIndex: ti });
  }

  onLeave(di: number, ti: number): void {
    this.dragLeaveCell.emit({ dayIndex: di, timeIndex: ti });
  }

  onSlotClick(entry: ScheduleEntry, di: number, ti: number): void {
    this.slotClicked.emit({ entry, dayIndex: di, timeIndex: ti });
  }

  trackByUid(_: number, entry: ScheduleEntry): string {
    return entry.uid;
  }
}