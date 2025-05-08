import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Customer } from "@models/masters/customer.model";
import { Roles } from "@models/masters/user.model";

export const CUSTOMER_TABLE_HEADERS: ITableHeader<Customer>[] = [
  { key: 'code', label: 'Código', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'name', label: 'Nombre', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'ruc', label: 'RUC', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'phone', label: 'Teléfono', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'address', label: 'Dirección', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'company', label: 'Empresa', type: 'entityName', filtered: false, roles: [Roles.ADMIN] },
];
