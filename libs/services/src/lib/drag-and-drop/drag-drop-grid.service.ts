import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import {
  GridItem,
  GridCell,
  GridLocation,
  GridItemSnapshot,
  HistoryAction,
  DragDropGridConfig,
} from '@project-manara-frontend/view-models';

export class DragDropGridService<TItem extends GridItem> {
  private _grid: GridCell<TItem>[][] = [];
  private _history: HistoryAction<TItem>[] = [];
  private _predicateCache = new Map<
    string,
    (drag: CdkDrag, drop: CdkDropList) => boolean
  >();
  private _uidCounter = 0;
  private _config!: DragDropGridConfig<TItem>;

  get grid(): GridCell<TItem>[][] {
    return this._grid;
  }

  get canUndo(): boolean {
    return this._history.length > 0;
  }

  configure(config: DragDropGridConfig<TItem>): void {
    this._config = config;
  }

  initGrid(
    rowCount: number,
    colCount: number,
    cellDataFactory?: (
      rowIndex: number,
      colIndex: number,
    ) => Record<string, unknown>,
  ): void {
    this._grid = [];
    this._predicateCache.clear();

    for (let row = 0; row < rowCount; row++) {
      this._grid[row] = [];
      for (let col = 0; col < colCount; col++) {
        const extraData = cellDataFactory?.(row, col) ?? {};
        this._grid[row][col] = {
          rowIndex: row,
          colIndex: col,
          items: [],
          isAvailable: true,
          dragOverState: null,
          conflictMessage: null,
          ...extraData,
        } as GridCell<TItem>;
      }
    }
  }

  generateUid(): string {
    return `grid-item_${++this._uidCounter}_${Date.now()}`;
  }

  getDropPredicate(
    rowIndex: number,
    colIndex: number,
  ): (drag: CdkDrag, drop: CdkDropList) => boolean {
    const cacheKey = `${rowIndex}_${colIndex}`;

    if (!this._predicateCache.has(cacheKey)) {
      const predicate = (drag: CdkDrag): boolean => {
        const targetCell = this._grid[rowIndex]?.[colIndex];
        if (!targetCell?.isAvailable) return false;
        const draggedItem = drag.data as TItem;
        return this._config.canDropItem
          ? this._config.canDropItem(draggedItem, targetCell)
          : true;
      };
      this._predicateCache.set(cacheKey, predicate);
    }

    return this._predicateCache.get(cacheKey)!;
  }

  onDragEnterCell(rowIndex: number, colIndex: number): void {
    const cell = this._grid[rowIndex]?.[colIndex];
    if (cell) cell.dragOverState = cell.isAvailable ? 'valid' : 'invalid';
  }

  onDragLeaveCell(rowIndex: number, colIndex: number): void {
    const cell = this._grid[rowIndex]?.[colIndex];
    if (cell) {
      cell.dragOverState = null;
      cell.conflictMessage = null;
    }
  }

  private clearAllDragStates(): void {
    this._grid.forEach((row) =>
      row.forEach((cell) => (cell.dragOverState = null)),
    );
  }

  onDropToCell(
    event: CdkDragDrop<TItem[]>,
    rowIndex: number,
    colIndex: number,
  ): void {
    this.clearAllDragStates();
    const targetCell = this._grid[rowIndex][colIndex];
    if (!targetCell.isAvailable) return;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        targetCell.items,
        event.previousIndex,
        event.currentIndex,
      );
      return;
    }

    const isFromPool =
      event.previousContainer.id === this._config.sourcePoolId;
    if (isFromPool) {
      this.handleAddFromPool(event, rowIndex, colIndex);
    } else {
      this.handleMoveBetweenCells(event, rowIndex, colIndex);
    }
  }

  onDropBackToPool(event: CdkDragDrop<TItem[]>): void {
    this.clearAllDragStates();
    if (event.previousContainer === event.container) return;

    const droppedItem = event.item.data as TItem;
    const location = this.findItemInGrid(droppedItem.uid);

    if (location) {
      this._history.push({
        type: 'remove',
        payload: {
          item: { ...droppedItem },
          fromRow: location.rowIndex,
          fromCol: location.colIndex,
          fromIndex: event.previousIndex,
        },
      });
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  private handleAddFromPool(
    event: CdkDragDrop<TItem[]>,
    rowIndex: number,
    colIndex: number,
  ): void {
    copyArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    const freshUid = this.generateUid();
    const sourceItem = event.container.data[event.currentIndex];
    const newItem: TItem = this._config.transformOnAdd
      ? this._config.transformOnAdd(sourceItem, freshUid)
      : { ...sourceItem, uid: freshUid };

    event.container.data[event.currentIndex] = newItem;

    this._history.push({
      type: 'add',
      payload: { item: newItem, toRow: rowIndex, toCol: colIndex },
    });
  }

  private handleMoveBetweenCells(
    event: CdkDragDrop<TItem[]>,
    toRow: number,
    toCol: number,
  ): void {
    const movedItem = event.item.data as TItem;
    const sourceLocation = this.findItemInGrid(movedItem.uid);

    if (sourceLocation) {
      this._history.push({
        type: 'move',
        payload: {
          item: { ...movedItem },
          fromRow: sourceLocation.rowIndex,
          fromCol: sourceLocation.colIndex,
          fromIndex: event.previousIndex,
          toRow,
          toCol,
        },
      });
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  undo(): void {
    const lastAction = this._history.pop();
    if (!lastAction) return;

    switch (lastAction.type) {
      case 'add': {
        const cell =
          this._grid[lastAction.payload.toRow]?.[lastAction.payload.toCol];
        if (!cell) break;
        const idx = cell.items.findIndex(
          (i) => i.uid === lastAction.payload.item.uid,
        );
        if (idx !== -1) cell.items.splice(idx, 1);
        break;
      }
      case 'remove': {
        const cell =
          this._grid[lastAction.payload.fromRow]?.[
            lastAction.payload.fromCol
          ];
        if (!cell) break;
        const insertAt = Math.min(
          lastAction.payload.fromIndex,
          cell.items.length,
        );
        cell.items.splice(insertAt, 0, lastAction.payload.item);
        break;
      }
      case 'move': {
        const loc = this.findItemInGrid(lastAction.payload.item.uid);
        if (!loc) break;
        const currentCell = this._grid[loc.rowIndex][loc.colIndex];
        const [item] = currentCell.items.splice(loc.itemIndex, 1);
        const originalCell =
          this._grid[lastAction.payload.fromRow][lastAction.payload.fromCol];
        const insertAt = Math.min(
          lastAction.payload.fromIndex,
          originalCell.items.length,
        );
        originalCell.items.splice(insertAt, 0, item);
        break;
      }
      case 'reset': {
        this.clearGrid();
        for (const snap of lastAction.payload.snapshots) {
          this._grid[snap.rowIndex]?.[snap.colIndex]?.items.push(snap.item);
        }
        break;
      }
    }
  }

  reset(): void {
    const snapshots = this.takeSnapshot();
    this._history.push({ type: 'reset', payload: { snapshots } });
    this.clearGrid();
  }

  takeSnapshot(): GridItemSnapshot<TItem>[] {
    const snapshots: GridItemSnapshot<TItem>[] = [];
    this._grid.forEach((row) =>
      row.forEach((cell) =>
        cell.items.forEach((item) =>
          snapshots.push({
            rowIndex: cell.rowIndex,
            colIndex: cell.colIndex,
            item: { ...item },
          }),
        ),
      ),
    );
    return snapshots;
  }

  findItemInGrid(uid: string): GridLocation | null {
    for (let r = 0; r < this._grid.length; r++) {
      for (let c = 0; c < this._grid[r].length; c++) {
        const idx = this._grid[r][c].items.findIndex((i) => i.uid === uid);
        if (idx !== -1)
          return { rowIndex: r, colIndex: c, itemIndex: idx };
      }
    }
    return null;
  }

  private clearGrid(): void {
    this._grid.forEach((row) =>
      row.forEach((cell) => {
        cell.items = [];
        cell.conflictMessage = null;
        cell.dragOverState = null;
      }),
    );
  }
}