import { Auth } from "@models/auth/auth.model";

export interface ApiResponseBase {
  success: boolean;
  title?: string;
  message?: string;
  status?: string;
  trashes?: number;
}

export interface ApiResCollection<T> extends ApiResponseBase {
  data: T[]
}

export interface ApiResSingle<T> extends ApiResponseBase {
  data: T
}

export interface AuthResponse extends ApiResponseBase {
  data: Auth
}
