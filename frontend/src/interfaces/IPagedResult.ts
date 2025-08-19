export default interface IPagedResult<T> {
  items: T[],
  pageNumber: number,
  pageSize: number,
  totalCount: number,
  totalPages: number,
}
