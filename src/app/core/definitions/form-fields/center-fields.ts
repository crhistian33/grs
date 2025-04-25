import { IFormField } from "@shared/models/bases/form-fields.model";

export const CENTER_FORM_FIELDS: IFormField[] = [
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
    type: 'number',
    key: 'mount',
    label: 'Monto (S/.)',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El monto es requerido.' },
    ],
  },
];
