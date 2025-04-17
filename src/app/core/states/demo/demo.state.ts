import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Demo, DemoResquest, DemoStateModel, INITIAL_VALUES } from '@models/masters/demo.model';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { DemoService } from '@services/masters/demo.service';
import { DemoActions } from '@states/demo/demo.actions';

@State<DemoStateModel>({
  name: 'demo',
  defaults: INITIAL_VALUES

})
@Injectable()
export class DemoState extends BaseState<Demo, DemoResquest> {
  constructor(private demoService: DemoService) {
    super(demoService);
  }

  // Selectores
  @Selector()
  static getState(state: DemoStateModel) {
    return state;
  }

  @Selector()
  static getItems(state: DemoStateModel) {
    return state.filterEntities;
  }

  @Selector()
  static getItemsTrashed(state: DemoStateModel) {
    return state.filterTrashEntities;
  }

  @Selector()
  static getTrashes(state: DemoStateModel) {
    return state.trashes;
  }

  @Selector()
  static getLoading(state: DemoStateModel) {
    return state.loading;
  }

  @Selector()
  static getSelectedItems(state: DemoStateModel) {
    return state.entities.filter((entity) => entity.selected);
  }

  @Selector()
  static areAllSelected(state: DemoStateModel) {
    return (
      state.entities.length > 0 &&
      state.entities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasSelectedItems(state: DemoStateModel) {
    return state.entities.some((entity) => entity.selected);
  }

  @Selector()
  static getTrashedSelectedItems(state: DemoStateModel) {
    return state.trashEntities.filter((entity) => entity.selected);
  }

  @Selector()
  static areTrashedAllSelected(state: DemoStateModel) {
    return (
      state.trashEntities.length > 0 &&
      state.trashEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasTrashedSelectedItems(state: DemoStateModel) {
    return state.trashEntities.some((entity) => entity.selected);
  }

  // Acciones
  @Action(DemoActions.GetAll)
  getAll(ctx: StateContext<DemoStateModel>) {
    return super.getAllBase(ctx);
  }

  @Action(DemoActions.GetAllTrash)
  getAllTrash(ctx: StateContext<DemoStateModel>) {
    return super.getAllTrashBase(ctx);
  }

  @Action(DemoActions.GetOne)
  getOne(ctx: StateContext<DemoStateModel>, { id }: DemoActions.GetOne) {
    return super.getOneBase(ctx, id, DemoActions.GetOne.type);
  }

  @Action(DemoActions.Create)
  create(ctx: StateContext<DemoStateModel>, { payload }: DemoActions.Create) {
    return super.createBase(ctx, payload, DemoActions.Create.type);
  }

  @Action(DemoActions.Update)
  update(ctx: StateContext<DemoStateModel>, { payload, id }: DemoActions.Update) {
    return super.updateBase(ctx, payload, id, DemoActions.Update.type);
  }

  @Action(DemoActions.Delete)
  delete(ctx: StateContext<DemoStateModel>, { id }: DemoActions.Delete) {
    return super.deleteBase(ctx, id, DemoActions.Delete.type);
  }

  @Action(DemoActions.DeleteForce)
  deleteForce(ctx: StateContext<DemoStateModel>, { id }: DemoActions.DeleteForce) {
    return super.deleteForceBase(ctx, id, DemoActions.DeleteForce.type);
  }

  @Action(DemoActions.DeleteAll)
  deleteAll(ctx: StateContext<DemoStateModel>, { payload }: DemoActions.DeleteAll) {
    return super.deleteAllBase(ctx, payload, DemoActions.DeleteAll.type);
  }

  @Action(DemoActions.DeleteForceAll)
  deleteForceAll(ctx: StateContext<DemoStateModel>, { payload }: DemoActions.DeleteForceAll) {
    return super.deleteForceAllBase(ctx, payload, DemoActions.DeleteForceAll.type);
  }

  @Action(DemoActions.Restore)
  restore(ctx: StateContext<DemoStateModel>, { id }: DemoActions.Restore) {
    return super.restoreBase(ctx, id, DemoActions.Restore.type);
  }

  @Action(DemoActions.RestoreAll)
  restoreAll(ctx: StateContext<DemoStateModel>, { payload }: DemoActions.RestoreAll) {
    return super.restoreAllBase(ctx, payload, DemoActions.RestoreAll.type);
  }

  @Action(DemoActions.ClearAll)
  clearAll(ctx: StateContext<DemoStateModel>) {
    return ctx.patchState(INITIAL_VALUES);
  }

  @Action(DemoActions.ToggleItemSelection)
  toggleSelection(ctx: StateContext<DemoStateModel>, { id, page }: DemoActions.ToggleItemSelection) {
    return super.toggleSelectionItem(ctx, id, page);
  }

  @Action(DemoActions.ToggleAllItems)
  toggleAll(ctx: StateContext<DemoStateModel>, { selected, page }: DemoActions.ToggleAllItems) {
    return super.toggleAllItem(ctx, selected, page);
  }

  @Action(DemoActions.Filter)
  filter(ctx: StateContext<DemoStateModel>, { payload, page, columns }: DemoActions.Filter<Demo>) {
    return super.filterBase(ctx, payload, page, columns)
  }
}
