import { UserRole } from "@models/masters/user.model";

export interface FilterDefinition {
  type: 'input' | 'select';
  label: string;
  key: string;
  roles: UserRole[];
  modules: string[];
  dependsOn?: string;
}
