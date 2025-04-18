import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Customer } from "@models/masters/customer.model";

export const CUSTOMER_TABLE_HEADERS: ITableHeader<Customer>[] = [
  { key: 'code', label: 'Código', type: 'text', filtered: true },
  { key: 'name', label: 'Nombre', type: 'text', filtered: true },
  { key: 'ruc', label: 'RUC', type: 'text', filtered: true },
  { key: 'phone', label: 'Teléfono', type: 'text', filtered: true },
  { key: 'company', label: 'Empresa', type: 'entityName', filtered: false },
];
