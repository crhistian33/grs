export const TITLES = {
  /* Principales */
  CENTERS: 'Centros de costo',
  TYPEWORKERS: 'Tipos de trabajador',
  COMPANIES: 'Empresas',
  CUSTOMERS: 'Clientes',
  UNITS: 'Unidades',
  SHIFTS: 'Turnos',
  WORKERS: 'TRabajadores',
  /* CRUD */
  CREATE: 'Nuevo registro',
  UPDATE: 'Actualizar registro',
  LIST: 'Listado',
  RECYCLE: 'Papelera de reciclaje',
  CEASED: 'Cesados',
  RENEW: 'Renovar contrato',
  /* Confirm */
  CONFIRM_RESTORE: '¿Desea restaurar el registro?',
  CONFIRM_RESTORE_ALL: '¿Desea restaurar los registros?',
  CONFIRM_DELETE: '¿Desea eliminar el registro?',
  CONFIRM_DELETE_ALL: '¿Desea eliminar los registros?',
}

export const MESSAGES = {
  MESSAGE_RESTORE: 'El registro se restaurará a la lista principal.',
  MESSAGE_RESTORE_ALL: 'Los registros se restaurarán a la lista principal.',
  MESSAGE_DELETE: 'El registro se eliminará de la lista. Lo podrá recuperar desde la papelera.',
  MESSAGE_DELETE_ALL: 'Los registros se eliminarán de la lista. Los podrá recuperar desde la papelera.',
  MESSAGE_DELETE_FORCE: 'El registro se eliminará definitivamente.',
  MESSAGE_DELETE_FORCE_ALL: 'Los registros se eliminarán definitivamente.',
}

export const TYPES = {
  LIST: 'Lista',
  RECYCLE: 'Papelera',
  CEASED: 'Cesados'
}

export const ACTIONS = {
  DELETE: 'Eliminar',
  RESTORE: 'Restaurar',
  CREATE: 'Guardar',
  UPDATE: 'Actualizar',
}

export const SEVERITIES = {
  DANGER: 'danger',
  PRIMARY: 'primary'
}

export const ICONS = {
  EXC_DANGER: 'pi pi-exclamation-circle text-red-500',
  EXC_PRIMARY: 'pi pi-exclamation-circle text-primary',
}

export const IDS = {
  COMPANY: 'companyId',
  CUSTOMER: 'customerId',
  UNIT: 'unitId',
  SHIFT: 'shiftId',
  CENTER: 'centerId',
  TYPEWORKER: 'typeworkerId',
  WORKER: 'workerId'
}
