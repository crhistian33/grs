import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";
import { Company } from "./company.model";
import { TypeWorker } from "./typeworker.model";

export interface Worker extends BaseModel {
  name: string;
  dni: string;
  birth_date: string;
  bank_account: string;
  company: Company;
  type_worker: TypeWorker;
}

export interface WorkerResquest {
  name: string;
  dni: string;
  birth_date: string;
  bank_Account: string;
  company_id: number;
  type_worker_id: number;
}

export interface WorkerStateModel extends BaseStateModel<Worker> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE
}
