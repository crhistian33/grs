import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Worker, WorkerResquest, WorkerStateModel, INITIAL_VALUES } from '@models/masters/worker.model';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { WorkerService } from '@services/masters/worker.service';
import { WorkerActions } from '@states/worker/worker.actions';
import { tap } from 'rxjs';
import { ApiResCollection } from '@shared/models/bases/response.model';

@State<WorkerStateModel>({
  name: 'worker',
  defaults: INITIAL_VALUES

})
@Injectable()
export class WorkerState extends BaseState<Worker, WorkerResquest> {
  constructor(private workerService: WorkerService) {
    super(workerService);
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
  static getItemsCeased(state: WorkerStateModel) {
    return state.filterCeasedEntities;
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

  @Selector()
  static getCeasedSelectedItems(state: WorkerStateModel) {
    return state.ceasedEntities?.filter((entity) => entity.selected);
  }

  @Selector()
  static areCeasedAllSelected(state: WorkerStateModel) {
    return (
      state.ceasedEntities && state.ceasedEntities.length > 0 &&
      state.ceasedEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasCeasedSelectedItems(state: WorkerStateModel) {
    return state.ceasedEntities?.some((entity) => entity.selected);
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

  @Action(WorkerActions.GetAllCeased)
  getAllCeased(ctx: StateContext<WorkerStateModel>) {
    ctx.patchState({ loading: true });
    return this.workerService.getCeased().pipe(
      tap({
        next: (response: ApiResCollection<Worker>) => {
          ctx.patchState({
            entities: response.data,
            filterEntities: response.data
          })
        },
        error: () => {
          ctx.patchState({ loading: false });
        },
        finalize: () => {
          ctx.patchState({ loading: false });
        }
      })
    );
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
