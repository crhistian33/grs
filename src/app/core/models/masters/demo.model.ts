import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";
import { Category } from "./category.model";

export interface Demo extends BaseModel {
  name: string;
  address: string;
  dni: string;
  phone: string;
  description: string;
  category: Category;
  //category_name: string;
}

export interface DemoResquest {
  name: string;
  address: string;
  dni: string;
  phone: string;
  description: string;
  category_id: string;
}

export interface DemoStateModel extends BaseStateModel<Demo> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
