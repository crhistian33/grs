import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";

export interface Center extends BaseModel {
  code: string;
  name: string;
  mount: number;
}

export interface CenterResquest {
  code: string;
  name: string;
  mount: number;
}

export interface CenterStateModel extends BaseStateModel<Center> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
