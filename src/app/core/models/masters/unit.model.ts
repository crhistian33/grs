import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";
import { Center } from "./center.model";
import { Customer } from "./customer.model";

export interface Unit extends BaseModel {
  code: string;
  name: string;
  location: string;
  min_assign: number;
  center: Center;
  customer: Customer;
}

export interface UnitResquest {
  code: string;
  name: string;
  location: string;
  min_assign: number;
  center_id: number;
  company_id: number;
}

export interface UnitStateModel extends BaseStateModel<Unit> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
