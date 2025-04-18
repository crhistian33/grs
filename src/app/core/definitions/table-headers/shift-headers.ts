import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Shift } from "@models/masters/shift.model";

export const SHIFT_TABLE_HEADERS: ITableHeader<Shift>[] = [
  { key: 'name', label: 'Nombre', type: 'text', filtered: true },
  { key: 'shortName', label: 'Nombre corto', type: 'text', filtered: true },
];
