import { IFormField } from "@shared/models/bases/form-fields.model";

export const SHIFT_FORM_FIELDS: IFormField[] = [
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
    key: 'shortName',
    label: 'Nombre corto',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El nombre corto es requerido' },
    ],
  },

];
