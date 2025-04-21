import { Company, CompanyResquest } from "@models/masters/company.model";
import { FilterStateModel } from "@shared/models/ui/filter.model";

export namespace CompanyActions {
  export class GetAll {
    static readonly type = '[Company] Get All';
  }

  export class GetAllTrash {
    static readonly type = '[Company] Get All Trashed';
  }

  export class GetOne {
    static readonly type = '[Company] Get One';
    constructor(public id: number) {}
  }

  export class Create {
    static readonly type = '[Company] Create';
    constructor(public payload: CompanyResquest) {}
  }

  export class Update {
    static readonly type = '[Company] Update';
    constructor(public id: number, public payload: Partial<CompanyResquest>) {}
  }

  export class Delete {
    static readonly type = '[Company] Delete';
    constructor(public id: number) {}
  }

  export class DeleteForce {
    static readonly type = '[Company] Delete Force';
    constructor(public id: number) {}
  }

  export class Restore {
    static readonly type = '[Company] Restore';
    constructor(public id: number) {}
  }

  export class DeleteAll {
    static readonly type = '[Company] Delete All';
    constructor(public payload: Company[]) {}
  }

  export class DeleteForceAll {
    static readonly type = '[Company] Delete Force All';
    constructor(public payload: Company[]) {}
  }

  export class RestoreAll {
    static readonly type = '[Company] Restore All';
    constructor(public payload: Company[]) {}
  }

  export class ClearAll {
    static readonly type = '[Company] Clear All';
  }

  export class ToggleItemSelection {
    static readonly type = '[Company] Toggle Selection';
    constructor(public id: number, public page: string) {}
  }

  export class ToggleAllItems {
    static readonly type = '[Company] Toggle All';
    constructor(public selected: boolean, public page: string) {}
  }

  export class ClearItemSelection {
    static readonly type = '[Company] Clear Selection';
  }

  export class Filter<T> {
    static readonly type = '[Company] Filter';
    constructor(public payload: Partial<FilterStateModel>, public page: string, public columns: (keyof T)[]) {}
  }
}
