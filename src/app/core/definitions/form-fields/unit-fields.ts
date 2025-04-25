import { IFormField } from "@shared/models/bases/form-fields.model";

export const UNIT_FORM_FIELDS: IFormField[] = [
  {
    type: 'select',
    key: 'customer_id',
    label: 'Cliente',
    prevcode: 'code',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El cliente es requerido' },
    ],
  },
  {
    type: 'text',
    key: 'code',
    label: 'Código',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El código es requerido' },
    ],
  },
  {
    type: 'text',
    key: 'name',
    label: 'Nombre',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El nombre es requerido' },
    ],
  },
  {
    type: 'text',
    key: 'location',
    label: 'Ubicación',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'La ubicación es requerida' },
    ],
  },
  {
    type: 'text',
    key: 'min_assign',
    label: 'N° Asignaciones',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El N° asignación es requerido' },
    ],
  },
  {
    type: 'select',
    key: 'center_id',
    label: 'Centro de costo',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El centro de costo es requerido' },
    ],
  },
  {
    type: 'multi-select',
    key: 'shifts',
    label: 'Turnos',
    cols: 1,
  },
];
