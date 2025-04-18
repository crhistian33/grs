import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Center } from "@models/masters/center.model";

export const CENTER_TABLE_HEADERS: ITableHeader<Center>[] = [
  { key: 'code', label: 'Código', type: 'text', filtered: true },
  { key: 'name', label: 'Nombre', type: 'text', filtered: true },
  { key: 'mount', label: 'monto (S/.)', type: 'text', filtered: true },
];
