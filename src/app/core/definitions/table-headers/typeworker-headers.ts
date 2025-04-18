import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { TypeWorker } from "@models/masters/typeworker.model";

export const TYPEWORKER_TABLE_HEADERS: ITableHeader<TypeWorker>[] = [
  { key: 'name', label: 'Nombre', type: 'text', filtered: true },
];
