import { IFormField } from "@shared/models/bases/form-fields.model";

export const WORKER_FORM_FIELDS: IFormField[] = [
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
    key: 'name',
    label: 'Nombre',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'El nombre es requerido' },
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
    type: 'date',
    key: 'birth_date',
    label: 'Fecha Nac.',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'La fecha de nacimiento es requerida.' },
    ],
  },
  {
    type: 'text',
    key: 'bank_account',
    label: 'Cuenta bancaria',
    cols: 1,
    validators: [
      { name: 'required', value: 'required', message: 'La cuenta bancaria es requerida.' },
    ],
  },
  {
    type: 'group',
    key: 'contract',
    label: 'Contrato',
    options: [
      {
        type: 'select',
        key: 'type_worker_id',
        label: 'Tipo de trabajador',
        cols: 1,
        validators: [
          { name: 'required', value: 'required', message: 'El tipo de trabajador es requerido.' },
        ],
      },
      {
        type: 'date',
        key: 'start_date',
        label: 'Fecha de inicio',
        cols: 1,
        validators: [
          { name: 'required', value: 'required', message: 'La fecha de inicio es requerida.' },
        ],
      },
      {
        type: 'date',
        key: 'end_date',
        label: 'Fecha de cese',
        cols: 1,
        validators: [
          { name: 'required', value: 'required', message: 'La fecha de cese es requerida.' },
        ],
      },
    ]
  },
];
