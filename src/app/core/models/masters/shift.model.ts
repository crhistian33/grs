import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";

export interface Shift extends BaseModel {
  name: string;
  shortName: string;
}

export interface ShiftResquest {
  name: string;
  shortName: string;
}

export interface ShiftStateModel extends BaseStateModel<Shift> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
