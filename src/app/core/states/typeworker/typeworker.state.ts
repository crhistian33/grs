import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { TypeWorker, TypeWorkerResquest, TypeWorkerStateModel, INITIAL_VALUES } from '@models/masters/typeworker.model';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { TypeWorkerService } from '@services/masters/typeworker.service';
import { TypeWorkerActions } from '@states/typeworker/typeworker.actions';

@State<TypeWorkerStateModel>({
  name: 'typeWorker',
  defaults: INITIAL_VALUES

})
@Injectable()
export class TypeWorkerState extends BaseState<TypeWorker, TypeWorkerResquest> {
  constructor(private typeWorkerService: TypeWorkerService) {
    super(typeWorkerService);
  }

  // Selectores
  @Selector()
  static getState(state: TypeWorkerStateModel) {
    return state;
  }

  @Selector()
  static getItems(state: TypeWorkerStateModel) {
    return state.filterEntities;
  }

  @Selector()
  static getItemsTrashed(state: TypeWorkerStateModel) {
    return state.filterTrashEntities;
  }

  @Selector()
  static getOptions(state: TypeWorkerStateModel) {
    return state.options ?? [];
  }

  @Selector()
  static getTrashes(state: TypeWorkerStateModel) {
    return state.trashes;
  }

  @Selector()
  static getLoading(state: TypeWorkerStateModel) {
    return state.loading;
  }

  @Selector()
  static getSelectedItems(state: TypeWorkerStateModel) {
    return state.entities.filter((entity) => entity.selected);
  }

  @Selector()
  static areAllSelected(state: TypeWorkerStateModel) {
    return (
      state.entities.length > 0 &&
      state.entities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasSelectedItems(state: TypeWorkerStateModel) {
    return state.entities.some((entity) => entity.selected);
  }

  @Selector()
  static getTrashedSelectedItems(state: TypeWorkerStateModel) {
    return state.trashEntities.filter((entity) => entity.selected);
  }

  @Selector()
  static areTrashedAllSelected(state: TypeWorkerStateModel) {
    return (
      state.trashEntities.length > 0 &&
      state.trashEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasTrashedSelectedItems(state: TypeWorkerStateModel) {
    return state.trashEntities.some((entity) => entity.selected);
  }

  // Acciones
  @Action(TypeWorkerActions.GetAll)
  getAll(ctx: StateContext<TypeWorkerStateModel>) {
    return super.getAllBase(ctx);
  }

  @Action(TypeWorkerActions.GetAllTrash)
  getAllTrash(ctx: StateContext<TypeWorkerStateModel>) {
    return super.getAllTrashBase(ctx);
  }

  @Action(TypeWorkerActions.GetOptions)
  getOptions(ctx: StateContext<TypeWorkerStateModel>) {
    return super.getOptionsBase(ctx);
  }

  @Action(TypeWorkerActions.GetOne)
  getOne(ctx: StateContext<TypeWorkerStateModel>, { id }: TypeWorkerActions.GetOne) {
    return super.getOneBase(ctx, id, TypeWorkerActions.GetOne.type);
  }

  @Action(TypeWorkerActions.Create)
  create(ctx: StateContext<TypeWorkerStateModel>, { payload }: TypeWorkerActions.Create) {
    return super.createBase(ctx, payload, TypeWorkerActions.Create.type);
  }

  @Action(TypeWorkerActions.Update)
  update(ctx: StateContext<TypeWorkerStateModel>, { payload, id }: TypeWorkerActions.Update) {
    return super.updateBase(ctx, payload, id, TypeWorkerActions.Update.type);
  }

  @Action(TypeWorkerActions.Delete)
  delete(ctx: StateContext<TypeWorkerStateModel>, { id }: TypeWorkerActions.Delete) {
    return super.deleteBase(ctx, id, TypeWorkerActions.Delete.type);
  }

  @Action(TypeWorkerActions.DeleteForce)
  deleteForce(ctx: StateContext<TypeWorkerStateModel>, { id }: TypeWorkerActions.DeleteForce) {
    return super.deleteForceBase(ctx, id, TypeWorkerActions.DeleteForce.type);
  }

  @Action(TypeWorkerActions.DeleteAll)
  deleteAll(ctx: StateContext<TypeWorkerStateModel>, { payload }: TypeWorkerActions.DeleteAll) {
    return super.deleteAllBase(ctx, payload, TypeWorkerActions.DeleteAll.type);
  }

  @Action(TypeWorkerActions.DeleteForceAll)
  deleteForceAll(ctx: StateContext<TypeWorkerStateModel>, { payload }: TypeWorkerActions.DeleteForceAll) {
    return super.deleteForceAllBase(ctx, payload, TypeWorkerActions.DeleteForceAll.type);
  }

  @Action(TypeWorkerActions.Restore)
  restore(ctx: StateContext<TypeWorkerStateModel>, { id }: TypeWorkerActions.Restore) {
    return super.restoreBase(ctx, id, TypeWorkerActions.Restore.type);
  }

  @Action(TypeWorkerActions.RestoreAll)
  restoreAll(ctx: StateContext<TypeWorkerStateModel>, { payload }: TypeWorkerActions.RestoreAll) {
    return super.restoreAllBase(ctx, payload, TypeWorkerActions.RestoreAll.type);
  }

  @Action(TypeWorkerActions.ClearAll)
  clearAll(ctx: StateContext<TypeWorkerStateModel>) {
    return ctx.patchState(INITIAL_VALUES);
  }

  @Action(TypeWorkerActions.ToggleItemSelection)
  toggleSelection(ctx: StateContext<TypeWorkerStateModel>, { id, page }: TypeWorkerActions.ToggleItemSelection) {
    return super.toggleSelectionItem(ctx, id, page);
  }

  @Action(TypeWorkerActions.ToggleAllItems)
  toggleAll(ctx: StateContext<TypeWorkerStateModel>, { selected, page }: TypeWorkerActions.ToggleAllItems) {
    return super.toggleAllItem(ctx, selected, page);
  }

  @Action(TypeWorkerActions.Filter)
  filter(ctx: StateContext<TypeWorkerStateModel>, { payload, page, columns }: TypeWorkerActions.Filter<TypeWorker>) {
    return super.filterBase(ctx, payload, page, columns)
  }
}
