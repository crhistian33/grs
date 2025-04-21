import { Customer, CustomerResquest } from "@models/masters/customer.model";
import { FilterStateModel } from "@shared/models/ui/filter.model";

export namespace CustomerActions {
  export class GetAll {
    static readonly type = '[Customer] Get All';
  }

  export class GetAllTrash {
    static readonly type = '[Customer] Get All Trashed';
  }

  export class GetOne {
    static readonly type = '[Customer] Get One';
    constructor(public id: number) {}
  }

  export class Create {
    static readonly type = '[Customer] Create';
    constructor(public payload: CustomerResquest) {}
  }

  export class Update {
    static readonly type = '[Customer] Update';
    constructor(public id: number, public payload: Partial<CustomerResquest>) {}
  }

  export class Delete {
    static readonly type = '[Customer] Delete';
    constructor(public id: number) {}
  }

  export class DeleteForce {
    static readonly type = '[Customer] Delete Force';
    constructor(public id: number) {}
  }

  export class Restore {
    static readonly type = '[Customer] Restore';
    constructor(public id: number) {}
  }

  export class DeleteAll {
    static readonly type = '[Customer] Delete All';
    constructor(public payload: Customer[]) {}
  }

  export class DeleteForceAll {
    static readonly type = '[Customer] Delete Force All';
    constructor(public payload: Customer[]) {}
  }

  export class RestoreAll {
    static readonly type = '[Customer] Restore All';
    constructor(public payload: Customer[]) {}
  }

  export class ClearAll {
    static readonly type = '[Customer] Clear All';
  }

  export class ToggleItemSelection {
    static readonly type = '[Customer] Toggle Selection';
    constructor(public id: number, public page: string) {}
  }

  export class ToggleAllItems {
    static readonly type = '[Customer] Toggle All';
    constructor(public selected: boolean, public page: string) {}
  }

  export class ClearItemSelection {
    static readonly type = '[Customer] Clear Selection';
  }

  export class Filter<T> {
    static readonly type = '[Customer] Filter';
    constructor(public payload: Partial<FilterStateModel>, public page: string, public columns: (keyof T)[]) {}
  }
}
