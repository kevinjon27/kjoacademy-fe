export type PaginatedResponse<T> = {
  current_page: number;
  data: T[];
  from: number;
  per_page: number;
  last_page: number;
  to: number;
  total: number;
};
