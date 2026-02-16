export interface PaginatedList<Item> {
   items: Item[]
  totalCount: number
  pageNumber: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
