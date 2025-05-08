import { UserRole } from "@models/masters/user.model";

export interface ITableHeader<T> {
  key: keyof T;
  label: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'currency' | 'month' | 'entityName' | 'entityNames';
  filtered?: boolean;
  roles?: UserRole[];
}

export interface RelationType {
  name: string;
  [key: string]: any;
}
