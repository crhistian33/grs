import { BaseModel } from "@shared/models/bases/base.model";
import { BaseStateModel, INITIAL_VALUES_BASE } from "@shared/models/bases/basestate-model";
import { Company } from "./company.model";
import { TypeWorker } from "./typeworker.model";
import { Contract } from "./contract.model";

export interface Worker extends BaseModel {
  name: string;
  dni: string;
  birth_date: string;
  bank_account: string;
  company: Company;
  typeworker: TypeWorker;
  start_date: string;
  end_date: string;
  state: string;
}

export interface WorkerResquest {
  name: string;
  dni: string;
  birth_date: string;
  bank_Account: string;
  company_id: number;
  contract: Contract;
}

export interface WorkerStateModel extends BaseStateModel<Worker> {};

export const INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE,
}
