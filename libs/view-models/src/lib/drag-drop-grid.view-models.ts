import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

export interface GridItem {
  uid: string;
}

export interface GridLocation {
  rowIndex: number;
  colIndex: number;
  itemIndex: number;
}

export interface GridItemSnapshot<TItem extends GridItem> {
  rowIndex: number;
  colIndex: number;
  item: TItem;
}

export interface GridCell<TItem extends GridItem> {
  rowIndex: number;
  colIndex: number;
  items: TItem[];
  isAvailable: boolean;
  dragOverState: 'valid' | 'invalid' | null;
  conflictMessage: string | null;
}

export interface AddAction<TItem extends GridItem> {
  type: 'add';
  payload: { item: TItem; toRow: number; toCol: number };
}

export interface MoveAction<TItem extends GridItem> {
  type: 'move';
  payload: {
    item: TItem;
    fromRow: number;
    fromCol: number;
    fromIndex: number;
    toRow: number;
    toCol: number;
  };
}

export interface RemoveAction<TItem extends GridItem> {
  type: 'remove';
  payload: {
    item: TItem;
    fromRow: number;
    fromCol: number;
    fromIndex: number;
  };
}

export interface ResetAction<TItem extends GridItem> {
  type: 'reset';
  payload: { snapshots: GridItemSnapshot<TItem>[] };
}

export type HistoryAction<TItem extends GridItem> =
  | AddAction<TItem>
  | MoveAction<TItem>
  | RemoveAction<TItem>
  | ResetAction<TItem>;

export interface DragDropGridConfig<TItem extends GridItem> {
  sourcePoolId: string;
  canDropItem?: (item: TItem, targetCell: GridCell<TItem>) => boolean;
  transformOnAdd?: (sourceItem: TItem, generatedUid: string) => TItem;
}