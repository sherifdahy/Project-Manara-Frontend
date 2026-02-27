export class RequestFilters {
  PageNumber: number = 1;
  PageSize: number = 10;
  SearchValue: string | null = null;
  SortColumn: string | null = null;
  SortDirection: string = 'ASC';
}
