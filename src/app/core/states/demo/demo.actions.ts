import { Demo, DemoResquest } from "@models/masters/demo.model";
import { FilterStateModel } from "@shared/models/ui/filter.model";

export namespace DemoActions {
  export class GetAll {
    static readonly type = '[Demo] Get All';
  }

  export class GetAllTrash {
    static readonly type = '[Demo] Get All Trashed';
  }

  export class GetOne {
    static readonly type = '[Demo] Get One';
    constructor(public id: number) {}
  }

  export class Create {
    static readonly type = '[Demo] Create';
    constructor(public payload: DemoResquest) {}
  }

  export class Update {
    static readonly type = '[Customer] Update';
    constructor(public id: number, public payload: Partial<DemoResquest>) {}
  }

  export class Delete {
    static readonly type = '[Demo] Delete';
    constructor(public id: number) {}
  }

  export class DeleteForce {
    static readonly type = '[Demo] Delete Force';
    constructor(public id: number) {}
  }

  export class Restore {
    static readonly type = '[Demo] Restore';
    constructor(public id: number) {}
  }

  export class DeleteAll {
    static readonly type = '[Demo] Delete All';
    constructor(public payload: Demo[]) {}
  }

  export class DeleteForceAll {
    static readonly type = '[Demo] Delete Force All';
    constructor(public payload: Demo[]) {}
  }

  export class RestoreAll {
    static readonly type = '[Demo] Restore All';
    constructor(public payload: Demo[]) {}
  }

  export class ClearAll {
    static readonly type = '[Demo] Clear All';
  }

  export class ToggleItemSelection {
    static readonly type = '[Demo] Toggle Selection';
    constructor(public id: number, public page: string) {}
  }

  export class ToggleAllItems {
    static readonly type = '[Demo] Toggle All';
    constructor(public selected: boolean, public page: string) {}
  }

  export class ClearItemSelection {
    static readonly type = '[Demo] Clear Selection';
  }

  export class Filter<T> {
    static readonly type = '[Demo] Filter';
    constructor(public payload: Partial<FilterStateModel>, public page: string, public columns: (keyof T)[]) {}
  }
}
