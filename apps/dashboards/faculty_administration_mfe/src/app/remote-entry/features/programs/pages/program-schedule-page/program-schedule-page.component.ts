import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem
} from '@angular/cdk/drag-drop';
import { SubjectResponse, PeriodResponse } from '@project-manara-frontend/models';
import { ProgramService } from '@project-manara-frontend/services';
import { PeriodsService } from '@project-manara-frontend/services';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { Observable, forkJoin, switchMap, tap, map, filter, take } from 'rxjs';

interface SubjectItem {
  id: number;
  name: string;
  code: string;
  creditHours: number;
}

interface ScheduleEntry {
  uid: string;
  subjectId: number;
  name: string;
  code: string;
  creditHours: number;
}

interface SlotCell {
  day: string;
  dayIndex: number;
  time: string;
  timeIndex: number;
  entries: ScheduleEntry[];
  facultyAvailable: boolean;
  conflictMessage: string | null;
  dragOverState: 'valid' | 'invalid' | null;
}

interface ActionHistoryItem {
  type: 'assign' | 'move' | 'remove' | 'reset';
  payload: any;
}

interface AssignmentRecord {
  dayIndex: number;
  timeIndex: number;
  entry: ScheduleEntry;
}

@Component({
  selector: 'app-program-schedule-page',
  templateUrl: './program-schedule-page.component.html',
  styleUrls: ['./program-schedule-page.component.css'],
  standalone: false
})
export class ProgramSchedulePageComponent implements OnInit {

  programId!: number;
  facultyId!: number;

  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  timeSlots: string[] = [];

  allSubjects: SubjectItem[] = [];

  // Pool: القائمة الأصلية اللي مش بتتغير
  poolEntries: ScheduleEntry[] = [];
  
  // المصفوفة اللي بتتعرض في الشاشة (عشان البحث)
  filteredPoolEntries: ScheduleEntry[] = [];
  searchQuery: string = '';

  slotGrid: SlotCell[][] = [];
  actionHistory: ActionHistoryItem[] = [];

  data$!: Observable<{ subjects: SubjectItem[]; periods: string[] }>;

  private _uidCounter = 0;
  private _predicateCache: Map<string, (drag: CdkDrag, drop: CdkDropList) => boolean> = new Map();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private programService: ProgramService,
    private periodsService: PeriodsService
  ) {}

  ngOnInit(): void {
    this.programId = Number(this.route.parent?.snapshot.paramMap.get('id'));

    this.data$ = this.store.select(selectFacultyId).pipe(
      filter((id): id is number => !!id),
      take(1),
      tap(facultyId => this.facultyId = facultyId),
      switchMap(facultyId =>
        forkJoin({
          subjects: this.programService.getSubjects(this.programId),
          periods: this.periodsService.getAll(facultyId, false)
        })
      ),
      map(({ subjects, periods }) => {
        const mappedSubjects: SubjectItem[] = subjects
          .filter(s => !s.isDeleted)
          .map(s => ({
            id: s.id,
            name: s.name,
            code: s.code,
            creditHours: s.creditHours
          }));

        const mappedPeriods: string[] = periods
          .filter(p => !p.isDeleted)
          .map(p => `${this.formatTime(p.startTime)} - ${this.formatTime(p.endTime)}`)
          .sort();

        return { subjects: mappedSubjects, periods: mappedPeriods };
      }),
      tap(({ subjects, periods }) => {
        this.allSubjects = subjects;
        this.timeSlots = periods;

        this.buildPool();
        this.buildGrid();
      })
    );
  }

  // ====== Search Functionality ======
  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.filterPool();
  }

  private filterPool(): void {
    if (!this.searchQuery.trim()) {
      this.filteredPoolEntries = [...this.poolEntries];
    } else {
      const q = this.searchQuery.toLowerCase();
      this.filteredPoolEntries = this.poolEntries.filter(entry => 
        entry.name.toLowerCase().includes(q) || 
        entry.code.toLowerCase().includes(q)
      );
    }
  }

  // ====== Pool Management ======

  private buildPool(): void {
    this.poolEntries = this.allSubjects.map(subject => ({
      uid: `pool_${subject.id}`,
      subjectId: subject.id,
      name: subject.name,
      code: subject.code,
      creditHours: subject.creditHours
    }));
    // تحديث مصفوفة العرض
    this.filterPool();
  }

  private generateUid(): string {
    return `entry_${++this._uidCounter}_${Date.now()}`;
  }

  // ====== Grid Setup ======

  private formatTime(time: string): string {
    if (!time) return '';
    const parts = time.split(':');
    return `${parts[0]}:${parts[1]}`;
  }

  private buildGrid(): void {
    this.slotGrid = [];
    this._predicateCache.clear();

    this.days.forEach((day, di) => {
      this.slotGrid[di] = [];
      this.timeSlots.forEach((time, ti) => {
        this.slotGrid[di][ti] = {
          day,
          dayIndex: di,
          time,
          timeIndex: ti,
          entries: [],
          facultyAvailable: true,
          conflictMessage: null,
          dragOverState: null
        };
      });
    });
  }

  trackByUid(_: number, e: ScheduleEntry): string {
    return e.uid;
  }

  // ====== Enter Predicate ======

  createEnterPredicate(di: number, ti: number): (drag: CdkDrag, drop: CdkDropList) => boolean {
    const key = `${di}_${ti}`;
    if (!this._predicateCache.has(key)) {
      this._predicateCache.set(key, (drag: CdkDrag): boolean => {
        const cell = this.slotGrid[di]?.[ti];
        if (!cell || !cell.facultyAvailable) return false;
        
        const dragged: ScheduleEntry = drag.data;
        if (cell.entries.some(e => e.subjectId === dragged.subjectId)) return false;
        
        return true;
      });
    }
    return this._predicateCache.get(key)!;
  }

  onSlotEnter(di: number, ti: number): void {
    const cell = this.slotGrid[di]?.[ti];
    if (!cell) return;
    cell.dragOverState = cell.facultyAvailable ? 'valid' : 'invalid';
  }

  onSlotExit(di: number, ti: number): void {
    const cell = this.slotGrid[di]?.[ti];
    if (cell) {
      cell.dragOverState = null;
      cell.conflictMessage = null;
    }
  }

  // ====== Drop Handlers ======

  onDropToSlot(event: CdkDragDrop<ScheduleEntry[]>, di: number, ti: number): void {
    this.clearDragStates();
    const cell = this.slotGrid[di][ti];
    if (!cell.facultyAvailable) return;

    if (event.previousContainer === event.container) {
      moveItemInArray(cell.entries, event.previousIndex, event.currentIndex);
      return;
    }

    const isFromPool = event.previousContainer.id === 'subjects-pool-list';
    
    if (isFromPool) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      const newEntry = { ...event.container.data[event.currentIndex], uid: this.generateUid() };
      event.container.data[event.currentIndex] = newEntry;

      this.actionHistory.push({
        type: 'assign',
        payload: { entry: newEntry, toDi: di, toTi: ti }
      });
    } else {
      const entry: ScheduleEntry = event.item.data;
      const sourceLoc = this.findEntryInGrid(entry.uid);

      if (sourceLoc) {
        this.actionHistory.push({
          type: 'move',
          payload: {
            entry: { ...entry },
            fromDi: sourceLoc.di,
            fromTi: sourceLoc.ti,
            fromIndex: event.previousIndex,
            toDi: di,
            toTi: ti
          }
        });
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onDropToPool(event: CdkDragDrop<ScheduleEntry[]>): void {
    this.clearDragStates();

    if (event.previousContainer === event.container) return;

    const entry: ScheduleEntry = event.item.data;
    const sourceLoc = this.findEntryInGrid(entry.uid);

    if (sourceLoc) {
      this.actionHistory.push({
        type: 'remove',
        payload: {
          entry: { ...entry },
          fromDi: sourceLoc.di,
          fromTi: sourceLoc.ti,
          fromIndex: event.previousIndex
        }
      });
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  // ====== Grid Search ======

  private findEntryInGrid(uid: string): { di: number; ti: number; index: number } | null {
    for (let di = 0; di < this.slotGrid.length; di++) {
      for (let ti = 0; ti < this.slotGrid[di].length; ti++) {
        const idx = this.slotGrid[di][ti].entries.findIndex(e => e.uid === uid);
        if (idx !== -1) return { di, ti, index: idx };
      }
    }
    return null;
  }

  // ====== Actions ======

  undoLastAction(): void {
    const last = this.actionHistory.pop();
    if (!last) return;

    switch (last.type) {
      case 'assign': {
        const cell = this.slotGrid[last.payload.toDi]?.[last.payload.toTi];
        if (cell) {
          const idx = cell.entries.findIndex(e => e.uid === last.payload.entry.uid);
          if (idx !== -1) cell.entries.splice(idx, 1);
        }
        break;
      }
      case 'remove': {
        const cell = this.slotGrid[last.payload.fromDi]?.[last.payload.fromTi];
        if (cell) {
          const insertIdx = Math.min(last.payload.fromIndex ?? cell.entries.length, cell.entries.length);
          cell.entries.splice(insertIdx, 0, last.payload.entry);
        }
        break;
      }
      case 'move': {
        const curLoc = this.findEntryInGrid(last.payload.entry.uid);
        if (curLoc) {
          const curCell = this.slotGrid[curLoc.di][curLoc.ti];
          const [e] = curCell.entries.splice(curLoc.index, 1);
          const origCell = this.slotGrid[last.payload.fromDi][last.payload.fromTi];
          const insertIdx = Math.min(last.payload.fromIndex ?? origCell.entries.length, origCell.entries.length);
          origCell.entries.splice(insertIdx, 0, e);
        }
        break;
      }
      case 'reset': {
        this.buildGrid();
        const prev = last.payload.records as AssignmentRecord[];
        for (const r of prev) {
          const cell = this.slotGrid[r.dayIndex]?.[r.timeIndex];
          if (cell) cell.entries.push(r.entry);
        }
        break;
      }
    }
  }

  resetSchedule(): void {
    const records: AssignmentRecord[] = [];
    for (const row of this.slotGrid) {
      for (const cell of row) {
        for (const entry of cell.entries) {
          records.push({
            dayIndex: cell.dayIndex,
            timeIndex: cell.timeIndex,
            entry: { ...entry }
          });
        }
      }
    }

    this.actionHistory.push({ type: 'reset', payload: { records } });

    for (const row of this.slotGrid) {
      for (const cell of row) {
        cell.entries = [];
        cell.conflictMessage = null;
        cell.dragOverState = null;
      }
    }
  }

  saveSchedule(): void {
    const assignments: any[] = [];
    for (const row of this.slotGrid) {
      for (const cell of row) {
        for (const entry of cell.entries) {
          assignments.push({
            subjectId: entry.subjectId,
            subjectCode: entry.code,
            subjectName: entry.name,
            day: cell.day,
            time: cell.time
          });
        }
      }
    }
    console.log('Saved:', { programId: this.programId, assignments });
    alert('Schedule saved successfully!');
  }

  private clearDragStates(): void {
    for (const row of this.slotGrid) {
      for (const cell of row) {
        cell.dragOverState = null;
      }
    }
  }
}