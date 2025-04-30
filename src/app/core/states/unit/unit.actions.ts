import { Unit, UnitResquest } from "@models/masters/unit.model";
import { FilterStateModel } from "@shared/models/ui/filter.model";

export namespace UnitActions {
  export class GetAll {
    static readonly type = '[Unit] Get All';
  }

  export class GetAllTrash {
    static readonly type = '[Unit] Get All Trashed';
  }

  export class GetOptions {
    static readonly type = '[Unit] Get Options';
  }

  export class GetOne {
    static readonly type = '[Unit] Get One';
    constructor(public id: number) {}
  }

  export class Create {
    static readonly type = '[Unit] Create';
    constructor(public payload: UnitResquest) {}
  }

  export class Update {
    static readonly type = '[Unit] Update';
    constructor(public id: number, public payload: Partial<UnitResquest>) {}
  }

  export class Delete {
    static readonly type = '[Unit] Delete';
    constructor(public id: number) {}
  }

  export class DeleteForce {
    static readonly type = '[Unit] Delete Force';
    constructor(public id: number) {}
  }

  export class Restore {
    static readonly type = '[Unit] Restore';
    constructor(public id: number) {}
  }

  export class DeleteAll {
    static readonly type = '[Unit] Delete All';
    constructor(public payload: Unit[]) {}
  }

  export class DeleteForceAll {
    static readonly type = '[Unit] Delete Force All';
    constructor(public payload: Unit[]) {}
  }

  export class RestoreAll {
    static readonly type = '[Unit] Restore All';
    constructor(public payload: Unit[]) {}
  }

  export class ClearAll {
    static readonly type = '[Unit] Clear All';
  }

  export class ToggleItemSelection {
    static readonly type = '[Unit] Toggle Selection';
    constructor(public id: number, public page: string) {}
  }

  export class ToggleAllItems {
    static readonly type = '[Unit] Toggle All';
    constructor(public selected: boolean, public page: string) {}
  }

  export class ClearItemSelection {
    static readonly type = '[Unit] Clear Selection';
  }

  export class Filter<T> {
    static readonly type = '[Unit] Filter';
    constructor(public payload: Partial<FilterStateModel>, public page: string, public columns: (keyof T)[]) {}
  }
}
