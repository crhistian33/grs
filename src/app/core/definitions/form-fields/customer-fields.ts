import { IFormField } from "@shared/models/bases/form-fields.model";

export const CUSTOMER_FORM_FIELDS: IFormField[] = [
  {
    type: 'select',
    key: 'company_id',
    label: 'Empresa',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'La empresa es requerida' },
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
    key: 'ruc',
    label: 'RUC',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El RUC es requerido' },
    ],
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
    type: 'text',
    key: 'address',
    label: 'Dirección',
    cols: 2,
    validators: [
      { name: 'required', value: 'required', message: 'La dirección es requerida' },
    ],
  },
];
