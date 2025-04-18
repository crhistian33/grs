import { ITableHeader } from "@shared/models/bases/table-headers.model";
import { Company } from "@models/masters/company.model";

export const COMPANY_TABLE_HEADERS: ITableHeader<Company>[] = [
  { key: 'code', label: 'Código', type: 'text', filtered: true },
  { key: 'name', label: 'Nombre', type: 'text', filtered: true },
];
