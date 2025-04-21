import { Worker, WorkerResquest } from "@models/masters/worker.model";
import { FilterStateModel } from "@shared/models/ui/filter.model";

export namespace WorkerActions {
  export class GetAll {
    static readonly type = '[Worker] Get All';
  }

  export class GetAllTrash {
    static readonly type = '[Worker] Get All Trashed';
  }

  export class GetOne {
    static readonly type = '[Worker] Get One';
    constructor(public id: number) {}
  }

  export class Create {
    static readonly type = '[Worker] Create';
    constructor(public payload: WorkerResquest) {}
  }

  export class Update {
    static readonly type = '[Worker] Update';
    constructor(public id: number, public payload: Partial<WorkerResquest>) {}
  }

  export class Delete {
    static readonly type = '[Worker] Delete';
    constructor(public id: number) {}
  }

  export class DeleteForce {
    static readonly type = '[Worker] Delete Force';
    constructor(public id: number) {}
  }

  export class Restore {
    static readonly type = '[Worker] Restore';
    constructor(public id: number) {}
  }

  export class DeleteAll {
    static readonly type = '[Worker] Delete All';
    constructor(public payload: Worker[]) {}
  }

  export class DeleteForceAll {
    static readonly type = '[Worker] Delete Force All';
    constructor(public payload: Worker[]) {}
  }

  export class RestoreAll {
    static readonly type = '[Worker] Restore All';
    constructor(public payload: Worker[]) {}
  }

  export class ClearAll {
    static readonly type = '[Worker] Clear All';
  }

  export class ToggleItemSelection {
    static readonly type = '[Worker] Toggle Selection';
    constructor(public id: number, public page: string) {}
  }

  export class ToggleAllItems {
    static readonly type = '[Worker] Toggle All';
    constructor(public selected: boolean, public page: string) {}
  }

  export class ClearItemSelection {
    static readonly type = '[Worker] Clear Selection';
  }

  export class Filter<T> {
    static readonly type = '[Worker] Filter';
    constructor(public payload: Partial<FilterStateModel>, public page: string, public columns: (keyof T)[]) {}
  }
}
