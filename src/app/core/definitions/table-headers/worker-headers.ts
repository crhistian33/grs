import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Worker } from "@models/masters/worker.model";

export const WORKER_TABLE_HEADERS: ITableHeader<Worker>[] = [
  { key: 'name', label: 'Nombre', type: 'text', filtered: true },
  { key: 'dni', label: 'DNI', type: 'text', filtered: true },
  { key: 'birth_date', label: 'Fecha Nac.', type: 'text', filtered: true },
  { key: 'bank_account', label: 'Cuenta bancaria', type: 'text', filtered: true },
  { key: 'typeworker', label: 'Tipo de trabajador', type: 'entityName', filtered: false },
  { key: 'start_date', label: 'Fecha de inicio', type: 'date', filtered: false },
  { key: 'end_date', label: 'Fecha de cese', type: 'date', filtered: false },
  { key: 'state', label: 'Estado', type: 'text', filtered: false },
  { key: 'company', label: 'Empresa', type: 'entityName', filtered: false },
];
