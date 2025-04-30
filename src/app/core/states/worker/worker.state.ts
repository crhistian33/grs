import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Worker, WorkerResquest, WorkerStateModel, INITIAL_VALUES } from '@models/masters/worker.model';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { WorkerService } from '@services/masters/worker.service';
import { WorkerActions } from '@states/worker/worker.actions';
import { SetLoading } from '@shared/states/loading/loading.actions';
import { tap } from 'rxjs';
import { ApiResSingle } from '@shared/models/bases/response.model';
import { Sort } from '@shared/models/ui/sort.model';

@State<WorkerStateModel>({
  name: 'worker',
  defaults: INITIAL_VALUES

})
@Injectable()
export class WorkerState extends BaseState<Worker, WorkerResquest> {
  constructor(private workerService: WorkerService) {
    super(workerService);
  }

  protected getSortField(): Sort<Worker> {
    return {
      field: 'end_date',
      type: 'date',
      direction: true
    };
  }

  // Selectores
  @Selector()
  static getState(state: WorkerStateModel) {
    return state;
  }

  @Selector()
  static getItems(state: WorkerStateModel) {
    return state.filterEntities;
  }

  @Selector()
  static getItemsTrashed(state: WorkerStateModel) {
    return state.filterTrashEntities;
  }

  @Selector()
  static getTrashes(state: WorkerStateModel) {
    return state.trashes;
  }

  @Selector()
  static getLoading(state: WorkerStateModel) {
    return state.loading;
  }

  @Selector()
  static getSelectedItems(state: WorkerStateModel) {
    return state.entities.filter((entity) => entity.selected);
  }

  @Selector()
  static areAllSelected(state: WorkerStateModel) {
    return (
      state.entities.length > 0 &&
      state.entities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasSelectedItems(state: WorkerStateModel) {
    return state.entities.some((entity) => entity.selected);
  }

  @Selector()
  static getTrashedSelectedItems(state: WorkerStateModel) {
    return state.trashEntities.filter((entity) => entity.selected);
  }

  @Selector()
  static areTrashedAllSelected(state: WorkerStateModel) {
    return (
      state.trashEntities.length > 0 &&
      state.trashEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasTrashedSelectedItems(state: WorkerStateModel) {
    return state.trashEntities.some((entity) => entity.selected);
  }

  // Acciones
  @Action(WorkerActions.GetAll)
  getAll(ctx: StateContext<WorkerStateModel>) {
    return super.getAllBase(ctx);
  }

  @Action(WorkerActions.GetAllTrash)
  getAllTrash(ctx: StateContext<WorkerStateModel>) {
    return super.getAllTrashBase(ctx);
  }

  @Action(WorkerActions.GetOne)
  getOne(ctx: StateContext<WorkerStateModel>, { id }: WorkerActions.GetOne) {
    return super.getOneBase(ctx, id, WorkerActions.GetOne.type);
  }

  @Action(WorkerActions.Create)
  create(ctx: StateContext<WorkerStateModel>, { payload }: WorkerActions.Create) {
    return super.createBase(ctx, payload, WorkerActions.Create.type);
  }

  @Action(WorkerActions.Update)
  update(ctx: StateContext<WorkerStateModel>, { payload, id }: WorkerActions.Update) {
    return super.updateBase(ctx, payload, id, WorkerActions.Update.type);
  }

  @Action(WorkerActions.Renew)
  renew(ctx: StateContext<WorkerStateModel>, { payload, id }: WorkerActions.Renew) {
    const type = WorkerActions.Renew.type;
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();

    return this.workerService.renew(id, payload)
    .pipe(
      tap({
        next: (response: ApiResSingle<Worker>) => {
          const updatedEntities = state.entities.map(entity =>
            entity.id === Number(id) ? { ...entity, ...response.data } : entity
          );
          ctx.patchState({
            entities: updatedEntities,
            filterEntities: updatedEntities,
            result: { title: response.title, message: response.message },
          });
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  @Action(WorkerActions.Delete)
  delete(ctx: StateContext<WorkerStateModel>, { id }: WorkerActions.Delete) {
    return super.deleteBase(ctx, id, WorkerActions.Delete.type);
  }

  @Action(WorkerActions.DeleteForce)
  deleteForce(ctx: StateContext<WorkerStateModel>, { id }: WorkerActions.DeleteForce) {
    return super.deleteForceBase(ctx, id, WorkerActions.DeleteForce.type);
  }

  @Action(WorkerActions.DeleteAll)
  deleteAll(ctx: StateContext<WorkerStateModel>, { payload }: WorkerActions.DeleteAll) {
    return super.deleteAllBase(ctx, payload, WorkerActions.DeleteAll.type);
  }

  @Action(WorkerActions.DeleteForceAll)
  deleteForceAll(ctx: StateContext<WorkerStateModel>, { payload }: WorkerActions.DeleteForceAll) {
    return super.deleteForceAllBase(ctx, payload, WorkerActions.DeleteForceAll.type);
  }

  @Action(WorkerActions.Restore)
  restore(ctx: StateContext<WorkerStateModel>, { id }: WorkerActions.Restore) {
    return super.restoreBase(ctx, id, WorkerActions.Restore.type);
  }

  @Action(WorkerActions.RestoreAll)
  restoreAll(ctx: StateContext<WorkerStateModel>, { payload }: WorkerActions.RestoreAll) {
    return super.restoreAllBase(ctx, payload, WorkerActions.RestoreAll.type);
  }

  @Action(WorkerActions.ClearAll)
  clearAll(ctx: StateContext<WorkerStateModel>) {
    return ctx.patchState(INITIAL_VALUES);
  }

  @Action(WorkerActions.ToggleItemSelection)
  toggleSelection(ctx: StateContext<WorkerStateModel>, { id, page }: WorkerActions.ToggleItemSelection) {
    return super.toggleSelectionItem(ctx, id, page);
  }

  @Action(WorkerActions.ToggleAllItems)
  toggleAll(ctx: StateContext<WorkerStateModel>, { selected, page }: WorkerActions.ToggleAllItems) {
    return super.toggleAllItem(ctx, selected, page);
  }

  @Action(WorkerActions.Filter)
  filter(ctx: StateContext<WorkerStateModel>, { payload, page, columns }: WorkerActions.Filter<Worker>) {
    return super.filterBase(ctx, payload, page, columns)
  }
}
