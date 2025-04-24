import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Unit } from "@models/masters/unit.model";

export const UNIT_TABLE_HEADERS: ITableHeader<Unit>[] = [
  { key: 'code', label: 'Código', type: 'text', filtered: true },
  { key: 'name', label: 'Nombre', type: 'text', filtered: true },
  { key: 'location', label: 'Ubicación', type: 'text', filtered: true },
  { key: 'min_assign', label: 'N° Asignados', type: 'text', filtered: true },
  { key: 'center', label: 'Centro de costo', type: 'entityName', filtered: false },
  { key: 'customer', label: 'Cliente', type: 'entityName', filtered: false },
  { key: 'shifts', label: 'Turnos', type: 'entityNames', filtered: false },
];
