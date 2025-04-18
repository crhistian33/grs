import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";
import { Company } from "./company.model";

export interface Customer extends BaseModel {
  code: string;
  name: string;
  ruc: string;
  phone: string;
  address: string;
  company: Company;
}

export interface CustomerResquest {
  code: string;
  name: string;
  ruc: string;
  phone: string;
  address: string;
  company_id: number;
}

export interface CustomerStateModel extends BaseStateModel<Customer> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
