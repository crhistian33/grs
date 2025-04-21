import { Center, CenterResquest } from "@models/masters/center.model";
import { FilterStateModel } from "@shared/models/ui/filter.model";

export namespace CenterActions {
  export class GetAll {
    static readonly type = '[Center] Get All';
  }

  export class GetAllTrash {
    static readonly type = '[Center] Get All Trashed';
  }

  export class GetOne {
    static readonly type = '[Center] Get One';
    constructor(public id: number) {}
  }

  export class Create {
    static readonly type = '[Center] Create';
    constructor(public payload: CenterResquest) {}
  }

  export class Update {
    static readonly type = '[Center] Update';
    constructor(public id: number, public payload: Partial<CenterResquest>) {}
  }

  export class Delete {
    static readonly type = '[Center] Delete';
    constructor(public id: number) {}
  }

  export class DeleteForce {
    static readonly type = '[Center] Delete Force';
    constructor(public id: number) {}
  }

  export class Restore {
    static readonly type = '[Center] Restore';
    constructor(public id: number) {}
  }

  export class DeleteAll {
    static readonly type = '[Center] Delete All';
    constructor(public payload: Center[]) {}
  }

  export class DeleteForceAll {
    static readonly type = '[Center] Delete Force All';
    constructor(public payload: Center[]) {}
  }

  export class RestoreAll {
    static readonly type = '[Center] Restore All';
    constructor(public payload: Center[]) {}
  }

  export class ClearAll {
    static readonly type = '[Center] Clear All';
  }

  export class ToggleItemSelection {
    static readonly type = '[Center] Toggle Selection';
    constructor(public id: number, public page: string) {}
  }

  export class ToggleAllItems {
    static readonly type = '[Center] Toggle All';
    constructor(public selected: boolean, public page: string) {}
  }

  export class ClearItemSelection {
    static readonly type = '[Center] Clear Selection';
  }

  export class Filter<T> {
    static readonly type = '[Center] Filter';
    constructor(public payload: Partial<FilterStateModel>, public page: string, public columns: (keyof T)[]) {}
  }
}
