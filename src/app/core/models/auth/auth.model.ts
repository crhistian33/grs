import { User } from "@models/masters/user.model";

export interface Auth {
  access_token: string;
  refresh_token: string;
}

export interface AuthStateModel {
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

export const INITIAL_VALUES = {
  access_token: null,
  refresh_token: null,
  isAuthenticated: false,
  user: null,
}
