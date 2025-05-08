import { Roles } from "@models/masters/user.model";
import { FilterDefinition } from "@shared/models/bases/filters.model";
import { IDS } from "@shared/utils/constants";

export const APP_FILTERS: FilterDefinition[] = [
  {
    type: 'input',
    label: 'Búsqueda',
    key: 'search',
    roles: [Roles.ADMIN, Roles.SUPERVISOR],
    modules: [ IDS.COMPANY, IDS.CUSTOMER, IDS.UNIT, IDS.SHIFT, IDS.TYPEWORKER, IDS.WORKER, IDS.CENTER],
  },
  {
    type: 'select',
    label: 'Empresa',
    key: IDS.COMPANY,
    roles: [Roles.ADMIN],
    modules: [IDS.CUSTOMER, IDS.UNIT, IDS.WORKER],
  },
  {
    type: 'select',
    label: 'Cliente',
    key: IDS.CUSTOMER,
    roles: [Roles.ADMIN, Roles.SUPERVISOR],
    modules: [IDS.UNIT],
    dependsOn: IDS.COMPANY,
  },
  {
    type: 'select',
    label: 'Unidad',
    key: IDS.UNIT,
    roles: [Roles.ADMIN, Roles.SUPERVISOR],
    modules: [],
    dependsOn: IDS.CUSTOMER,
  },
  {
    type: 'select',
    label: 'Turnos',
    key: 'shiftId',
    roles: [Roles.ADMIN, Roles.SUPERVISOR],
    modules: [IDS.UNIT],
    dependsOn: IDS.CUSTOMER,
  },
  {
    type: 'select',
    label: 'Centro de costo',
    key: IDS.CENTER,
    roles: [Roles.ADMIN, Roles.SUPERVISOR],
    modules: [IDS.UNIT],
  },
  {
    type: 'select',
    label: 'Tipo de trabajador',
    key: IDS.TYPEWORKER,
    roles: [Roles.ADMIN, Roles.SUPERVISOR],
    modules: [IDS.WORKER],
  },
];
