import { TypeWorker, TypeWorkerResquest } from "@models/masters/typeworker.model";
import { FilterStateModel } from "@shared/models/ui/filter.model";

export namespace TypeWorkerActions {
  export class GetAll {
    static readonly type = '[TypeWorker] Get All';
  }

  export class GetAllTrash {
    static readonly type = '[TypeWorker] Get All Trashed';
  }

  export class GetOne {
    static readonly type = '[TypeWorker] Get One';
    constructor(public id: number) {}
  }

  export class Create {
    static readonly type = '[TypeWorker] Create';
    constructor(public payload: TypeWorkerResquest) {}
  }

  export class Update {
    static readonly type = '[TypeWorker] Update';
    constructor(public id: number, public payload: Partial<TypeWorkerResquest>) {}
  }

  export class Delete {
    static readonly type = '[TypeWorker] Delete';
    constructor(public id: number) {}
  }

  export class DeleteForce {
    static readonly type = '[TypeWorker] Delete Force';
    constructor(public id: number) {}
  }

  export class Restore {
    static readonly type = '[TypeWorker] Restore';
    constructor(public id: number) {}
  }

  export class DeleteAll {
    static readonly type = '[TypeWorker] Delete All';
    constructor(public payload: TypeWorker[]) {}
  }

  export class DeleteForceAll {
    static readonly type = '[TypeWorker] Delete Force All';
    constructor(public payload: TypeWorker[]) {}
  }

  export class RestoreAll {
    static readonly type = '[TypeWorker] Restore All';
    constructor(public payload: TypeWorker[]) {}
  }

  export class ClearAll {
    static readonly type = '[TypeWorker] Clear All';
  }

  export class ToggleItemSelection {
    static readonly type = '[TypeWorker] Toggle Selection';
    constructor(public id: number, public page: string) {}
  }

  export class ToggleAllItems {
    static readonly type = '[TypeWorker] Toggle All';
    constructor(public selected: boolean, public page: string) {}
  }

  export class ClearItemSelection {
    static readonly type = '[TypeWorker] Clear Selection';
  }

  export class Filter<T> {
    static readonly type = '[TypeWorker] Filter';
    constructor(public payload: Partial<FilterStateModel>, public page: string, public columns: (keyof T)[]) {}
  }
}
