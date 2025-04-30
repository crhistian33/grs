import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Unit, UnitResquest, UnitStateModel, INITIAL_VALUES } from '@models/masters/unit.model';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { UnitService } from '@services/masters/unit.service';
import { UnitActions } from '@states/unit/unit.actions';

@State<UnitStateModel>({
  name: 'unit',
  defaults: INITIAL_VALUES

})
@Injectable()
export class UnitState extends BaseState<Unit, UnitResquest> {
  constructor(private unitService: UnitService) {
    super(unitService);
  }

  // Selectores
  @Selector()
  static getState(state: UnitStateModel) {
    return state;
  }

  @Selector()
  static getItems(state: UnitStateModel) {
    return state.filterEntities;
  }

  @Selector()
  static getItemsTrashed(state: UnitStateModel) {
    return state.filterTrashEntities;
  }

  @Selector()
  static getOptions(state: UnitStateModel) {
    return state.options ?? [];
  }

  @Selector()
  static getTrashes(state: UnitStateModel) {
    return state.trashes;
  }

  @Selector()
  static getLoading(state: UnitStateModel) {
    return state.loading;
  }

  @Selector()
  static getSelectedItems(state: UnitStateModel) {
    return state.entities.filter((entity) => entity.selected);
  }

  @Selector()
  static areAllSelected(state: UnitStateModel) {
    return (
      state.entities.length > 0 &&
      state.entities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasSelectedItems(state: UnitStateModel) {
    return state.entities.some((entity) => entity.selected);
  }

  @Selector()
  static getTrashedSelectedItems(state: UnitStateModel) {
    return state.trashEntities.filter((entity) => entity.selected);
  }

  @Selector()
  static areTrashedAllSelected(state: UnitStateModel) {
    return (
      state.trashEntities.length > 0 &&
      state.trashEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasTrashedSelectedItems(state: UnitStateModel) {
    return state.trashEntities.some((entity) => entity.selected);
  }

  // Acciones
  @Action(UnitActions.GetAll)
  getAll(ctx: StateContext<UnitStateModel>) {
    return super.getAllBase(ctx);
  }

  @Action(UnitActions.GetAllTrash)
  getAllTrash(ctx: StateContext<UnitStateModel>) {
    return super.getAllTrashBase(ctx);
  }

  @Action(UnitActions.GetOptions)
  getOptions(ctx: StateContext<UnitStateModel>) {
    return super.getOptionsBase(ctx);
  }

  @Action(UnitActions.GetOne)
  getOne(ctx: StateContext<UnitStateModel>, { id }: UnitActions.GetOne) {
    return super.getOneBase(ctx, id, UnitActions.GetOne.type);
  }

  @Action(UnitActions.Create)
  create(ctx: StateContext<UnitStateModel>, { payload }: UnitActions.Create) {
    return super.createBase(ctx, payload, UnitActions.Create.type);
  }

  @Action(UnitActions.Update)
  update(ctx: StateContext<UnitStateModel>, { payload, id }: UnitActions.Update) {
    return super.updateBase(ctx, payload, id, UnitActions.Update.type);
  }

  @Action(UnitActions.Delete)
  delete(ctx: StateContext<UnitStateModel>, { id }: UnitActions.Delete) {
    return super.deleteBase(ctx, id, UnitActions.Delete.type);
  }

  @Action(UnitActions.DeleteForce)
  deleteForce(ctx: StateContext<UnitStateModel>, { id }: UnitActions.DeleteForce) {
    return super.deleteForceBase(ctx, id, UnitActions.DeleteForce.type);
  }

  @Action(UnitActions.DeleteAll)
  deleteAll(ctx: StateContext<UnitStateModel>, { payload }: UnitActions.DeleteAll) {
    return super.deleteAllBase(ctx, payload, UnitActions.DeleteAll.type);
  }

  @Action(UnitActions.DeleteForceAll)
  deleteForceAll(ctx: StateContext<UnitStateModel>, { payload }: UnitActions.DeleteForceAll) {
    return super.deleteForceAllBase(ctx, payload, UnitActions.DeleteForceAll.type);
  }

  @Action(UnitActions.Restore)
  restore(ctx: StateContext<UnitStateModel>, { id }: UnitActions.Restore) {
    return super.restoreBase(ctx, id, UnitActions.Restore.type);
  }

  @Action(UnitActions.RestoreAll)
  restoreAll(ctx: StateContext<UnitStateModel>, { payload }: UnitActions.RestoreAll) {
    return super.restoreAllBase(ctx, payload, UnitActions.RestoreAll.type);
  }

  @Action(UnitActions.ClearAll)
  clearAll(ctx: StateContext<UnitStateModel>) {
    return ctx.patchState(INITIAL_VALUES);
  }

  @Action(UnitActions.ToggleItemSelection)
  toggleSelection(ctx: StateContext<UnitStateModel>, { id, page }: UnitActions.ToggleItemSelection) {
    return super.toggleSelectionItem(ctx, id, page);
  }

  @Action(UnitActions.ToggleAllItems)
  toggleAll(ctx: StateContext<UnitStateModel>, { selected, page }: UnitActions.ToggleAllItems) {
    return super.toggleAllItem(ctx, selected, page);
  }

  @Action(UnitActions.Filter)
  filter(ctx: StateContext<UnitStateModel>, { payload, page, columns }: UnitActions.Filter<Unit>) {
    return super.filterBase(ctx, payload, page, columns)
  }
}
