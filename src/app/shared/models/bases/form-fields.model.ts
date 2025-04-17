export interface IFormField {
  type: 'text' | 'tel' | 'textarea' | 'number' | 'select' | 'date' | 'checkbox';
  key: string;
  label: string;
  cols: number;
  validators?: ValidatorConfig[];
  defaultValue?: any;
  maxLength?: number;
  disabled?: boolean;
  hidden?: boolean;
}

export interface ValidatorConfig {
  name: 'required' | 'minLength' | 'maxLength' | 'pattern';
  message: string;
  value?: any;
}
