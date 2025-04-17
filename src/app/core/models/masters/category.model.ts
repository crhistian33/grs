import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";

export interface Category extends BaseModel {
  name: string;
}

export interface CategoryRequest {
  name: string;
}

export interface CategoryStateModel extends BaseStateModel<Category> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
