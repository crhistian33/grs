export interface IFormField {
  type: 'text' | 'tel' | 'textarea' | 'number' | 'select' | 'multi-select' | 'date' | 'checkbox' | 'array' | 'group';
  key: string;
  label: string;
  cols?: number;
  validators?: ValidatorConfig[];
  defaultValue?: any;
  prevcode?: string;
  maxLength?: number;
  disabled?: boolean;
  hidden?: boolean;
  options?: IFormField[];
}

export interface ValidatorConfig {
  name: 'required' | 'minLength' | 'maxLength' | 'pattern';
  message: string;
  value?: any;
}
