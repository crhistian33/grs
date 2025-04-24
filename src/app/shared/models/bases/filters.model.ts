export interface FilterDefinition {
  type: 'input' | 'select';
  label: string;
  key: string;
  modules: string[];
}
