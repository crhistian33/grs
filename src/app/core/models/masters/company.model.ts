import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";

export interface Company extends BaseModel {
  code: string;
  name: string;
}

export interface CompanyResquest {
  code: string;
  name: string;
}

export interface CompanyStateModel extends BaseStateModel<Company> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
