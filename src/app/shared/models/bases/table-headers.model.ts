export interface ITableHeader<T> {
  key: keyof T;
  label: string;
  type: 'text' | 'date' | 'number' | 'month' | 'entityName';
  filtered?: boolean;
}

export interface RelationType {
  name: string;
  [key: string]: any;
}
