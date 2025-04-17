import { IFormField } from "@shared/models/bases/form-fields.model";

export const DEMO_FORM_FIELDS: IFormField[] = [
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
    key: 'address',
    label: 'Dirección',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'La dirección es requerida' },
    ],
  },
  {
    type: 'text',
    key: 'dni',
    label: 'DNI',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El dni es requerido.' },
      { name: 'pattern', value: 'pattern(8)', message: 'El dni debe tener 8 dígitos numéricos.' }
    ],
    maxLength: 8
  },
  {
    type: 'tel',
    key: 'phone',
    label: 'Teléfono',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El teléfono es requerido.' },
      { name: 'pattern', value: 'pattern(9)', message: 'El teléfono solo permite dígitos numéricos.'}
    ],
    maxLength: 9
  },
  {
    type: 'select',
    key: 'category_id',
    label: 'Categoría',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'La categoría es requerida' },
    ],
  },
  {
    type: 'textarea',
    key: 'description',
    label: 'Descripción',
    cols: 2,
  },
];
