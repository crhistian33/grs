import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Worker } from "@models/masters/worker.model";
import { Roles } from "@models/masters/user.model";

export const WORKER_TABLE_HEADERS: ITableHeader<Worker>[] = [
  { key: 'name', label: 'Nombre', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'dni', label: 'DNI', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'birth_date', label: 'Fecha Nac.', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'bank_account', label: 'Cuenta bancaria', type: 'text', filtered: true, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'typeworker', label: 'Tipo de trabajador', type: 'entityName', filtered: false, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'start_date', label: 'Fecha de inicio', type: 'date', filtered: false, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'end_date', label: 'Fecha de cese', type: 'date', filtered: false, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'state', label: 'Estado', type: 'text', filtered: false, roles: [Roles.ADMIN, Roles.SUPERVISOR] },
  { key: 'company', label: 'Empresa', type: 'entityName', filtered: false, roles: [Roles.ADMIN] },
];
