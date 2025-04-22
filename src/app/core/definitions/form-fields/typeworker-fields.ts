import { IFormField } from "@shared/models/bases/form-fields.model";

export const TYPEWORKER_FORM_FIELDS: IFormField[] = [
  {
    type: 'text',
    key: 'name',
    label: 'Nombre',
    cols: 2,
    validators: [
      { name: 'required', value: 'required', message: 'El nombre es requerido' },
      { name: 'maxLength', value: 'maxLength(20)', message: 'El nombre debe contener hasta 20 dígitos' }
    ],
  },
];
