export interface ITableHeader<T> {
  key: keyof T;
  label: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'currency' | 'month' | 'entityName' | 'entityNames';
  filtered?: boolean;
}

export interface RelationType {
  name: string;
  [key: string]: any;
}
