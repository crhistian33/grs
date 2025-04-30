import { Shift, ShiftResquest } from "@models/masters/shift.model";
import { FilterStateModel } from "@shared/models/ui/filter.model";

export namespace ShiftActions {
  export class GetAll {
    static readonly type = '[Shift] Get All';
  }

  export class GetAllTrash {
    static readonly type = '[Shift] Get All Trashed';
  }

  export class GetOptions {
    static readonly type = '[Shift] Get Options';
  }

  export class GetOne {
    static readonly type = '[Shift] Get One';
    constructor(public id: number) {}
  }

  export class Create {
    static readonly type = '[Shift] Create';
    constructor(public payload: ShiftResquest) {}
  }

  export class Update {
    static readonly type = '[Shift] Update';
    constructor(public id: number, public payload: Partial<ShiftResquest>) {}
  }

  export class Delete {
    static readonly type = '[Shift] Delete';
    constructor(public id: number) {}
  }

  export class DeleteForce {
    static readonly type = '[Shift] Delete Force';
    constructor(public id: number) {}
  }

  export class Restore {
    static readonly type = '[Shift] Restore';
    constructor(public id: number) {}
  }

  export class DeleteAll {
    static readonly type = '[Shift] Delete All';
    constructor(public payload: Shift[]) {}
  }

  export class DeleteForceAll {
    static readonly type = '[Shift] Delete Force All';
    constructor(public payload: Shift[]) {}
  }

  export class RestoreAll {
    static readonly type = '[Shift] Restore All';
    constructor(public payload: Shift[]) {}
  }

  export class ClearAll {
    static readonly type = '[Shift] Clear All';
  }

  export class ToggleItemSelection {
    static readonly type = '[Shift] Toggle Selection';
    constructor(public id: number, public page: string) {}
  }

  export class ToggleAllItems {
    static readonly type = '[Shift] Toggle All';
    constructor(public selected: boolean, public page: string) {}
  }

  export class ClearItemSelection {
    static readonly type = '[Shift] Clear Selection';
  }

  export class Filter<T> {
    static readonly type = '[Shift] Filter';
    constructor(public payload: Partial<FilterStateModel>, public page: string, public columns: (keyof T)[]) {}
  }
}
