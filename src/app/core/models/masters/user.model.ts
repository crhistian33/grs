import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";

export interface User extends BaseModel {
  name: string;
  email: string;
  role: Role;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  role_id: number;
}

export interface Role extends BaseModel {
  name: string;
  description: string;
}

export enum Roles {
  SUPERVISOR = 'supervisor',
  ADMIN = 'admin',
  USER = 'user'
}

export type UserRole = Roles.SUPERVISOR | Roles.ADMIN | Roles.USER;

export interface UserStateModel extends BaseStateModel<User> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
