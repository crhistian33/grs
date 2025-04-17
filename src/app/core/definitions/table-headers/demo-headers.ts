import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Demo } from "@models/masters/demo.model";

export const DEMO_TABLE_HEADERS: ITableHeader<Demo>[] = [
  { key: 'name', label: 'Nombre', type: 'text', filtered: true },
  { key: 'address', label: 'Dirección', type: 'text', filtered: true },
  { key: 'dni', label: 'DNI', type: 'text', filtered: true },
  { key: 'phone', label: 'Teléfono', type: 'text', filtered: true },
  { key: 'description', label: 'Descripción', type: 'text', filtered: true },
  { key: 'category', label: 'Categoría', type: 'entityName', filtered: false },
];
