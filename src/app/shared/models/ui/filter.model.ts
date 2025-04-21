export interface FilterOptions {
  search?: boolean;
  categoryId?: boolean;
}

export interface FilterStateModel {
  search?: string | null;
  categoryId?: number | null;
}
