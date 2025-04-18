import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";

export interface TypeWorker extends BaseModel {
  name: string;
}

export interface TypeWorkerResquest {
  name: string;
}

export interface TypeWorkerStateModel extends BaseStateModel<TypeWorker> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
