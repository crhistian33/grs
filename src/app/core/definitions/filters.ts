import { FilterDefinition } from "@shared/models/bases/filters.model";
import { IDS } from "@shared/utils/constants";

export const APP_FILTERS: FilterDefinition[] = [
  {
    type: 'input',
    label: 'Búsqueda',
    key: 'search',
    modules: [ IDS.COMPANY, IDS.CUSTOMER, IDS.UNIT, IDS.SHIFT, IDS.TYPEWORKER, IDS.WORKER, IDS.CENTER],
  },
  {
    type: 'select',
    label: 'Empresa',
    key: IDS.COMPANY,
    modules: [IDS.CUSTOMER, IDS.UNIT, IDS.WORKER],
  },
  {
    type: 'select',
    label: 'Cliente',
    key: IDS.CUSTOMER,
    modules: [IDS.UNIT],
  },
  {
    type: 'select',
    label: 'Unidad',
    key: IDS.UNIT,
    modules: [],
  },
  {
    type: 'select',
    label: IDS.SHIFT,
    key: 'shiftId',
    modules: [],
  },
  {
    type: 'select',
    label: 'Centro de costo',
    key: IDS.CENTER,
    modules: [IDS.UNIT],
  },
  {
    type: 'select',
    label: 'Tipo de trabajador',
    key: IDS.TYPEWORKER,
    modules: [IDS.WORKER],
  },
];
