export type SortFieldType = 'date' | 'string' | 'number' | 'boolean';

export interface Sort<T> {
  field: keyof T;
  type: SortFieldType;
  direction: boolean;
}
