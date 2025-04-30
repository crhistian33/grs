import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Shift, ShiftResquest, ShiftStateModel, INITIAL_VALUES } from '@models/masters/shift.model';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { ShiftService } from '@services/masters/shift.service';
import { ShiftActions } from '@states/shift/shift.actions';

@State<ShiftStateModel>({
  name: 'shift',
  defaults: INITIAL_VALUES

})
@Injectable()
export class ShiftState extends BaseState<Shift, ShiftResquest> {
  constructor(private shiftService: ShiftService) {
    super(shiftService);
  }

  // Selectores
  @Selector()
  static getState(state: ShiftStateModel) {
    return state;
  }

  @Selector()
  static getItems(state: ShiftStateModel) {
    return state.filterEntities;
  }

  @Selector()
  static getItemsTrashed(state: ShiftStateModel) {
    return state.filterTrashEntities;
  }

  @Selector()
  static getOptions(state: ShiftStateModel) {
    return state.options ?? [];
  }

  @Selector()
  static getTrashes(state: ShiftStateModel) {
    return state.trashes;
  }

  @Selector()
  static getLoading(state: ShiftStateModel) {
    return state.loading;
  }

  @Selector()
  static getSelectedItems(state: ShiftStateModel) {
    return state.entities.filter((entity) => entity.selected);
  }

  @Selector()
  static areAllSelected(state: ShiftStateModel) {
    return (
      state.entities.length > 0 &&
      state.entities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasSelectedItems(state: ShiftStateModel) {
    return state.entities.some((entity) => entity.selected);
  }

  @Selector()
  static getTrashedSelectedItems(state: ShiftStateModel) {
    return state.trashEntities.filter((entity) => entity.selected);
  }

  @Selector()
  static areTrashedAllSelected(state: ShiftStateModel) {
    return (
      state.trashEntities.length > 0 &&
      state.trashEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasTrashedSelectedItems(state: ShiftStateModel) {
    return state.trashEntities.some((entity) => entity.selected);
  }

  // Acciones
  @Action(ShiftActions.GetAll)
  getAll(ctx: StateContext<ShiftStateModel>) {
    return super.getAllBase(ctx);
  }

  @Action(ShiftActions.GetAllTrash)
  getAllTrash(ctx: StateContext<ShiftStateModel>) {
    return super.getAllTrashBase(ctx);
  }

  @Action(ShiftActions.GetOptions)
  getOptions(ctx: StateContext<ShiftStateModel>) {
    return super.getOptionsBase(ctx);
  }

  @Action(ShiftActions.GetOne)
  getOne(ctx: StateContext<ShiftStateModel>, { id }: ShiftActions.GetOne) {
    return super.getOneBase(ctx, id, ShiftActions.GetOne.type);
  }

  @Action(ShiftActions.Create)
  create(ctx: StateContext<ShiftStateModel>, { payload }: ShiftActions.Create) {
    return super.createBase(ctx, payload, ShiftActions.Create.type);
  }

  @Action(ShiftActions.Update)
  update(ctx: StateContext<ShiftStateModel>, { payload, id }: ShiftActions.Update) {
    return super.updateBase(ctx, payload, id, ShiftActions.Update.type);
  }

  @Action(ShiftActions.Delete)
  delete(ctx: StateContext<ShiftStateModel>, { id }: ShiftActions.Delete) {
    return super.deleteBase(ctx, id, ShiftActions.Delete.type);
  }

  @Action(ShiftActions.DeleteForce)
  deleteForce(ctx: StateContext<ShiftStateModel>, { id }: ShiftActions.DeleteForce) {
    return super.deleteForceBase(ctx, id, ShiftActions.DeleteForce.type);
  }

  @Action(ShiftActions.DeleteAll)
  deleteAll(ctx: StateContext<ShiftStateModel>, { payload }: ShiftActions.DeleteAll) {
    return super.deleteAllBase(ctx, payload, ShiftActions.DeleteAll.type);
  }

  @Action(ShiftActions.DeleteForceAll)
  deleteForceAll(ctx: StateContext<ShiftStateModel>, { payload }: ShiftActions.DeleteForceAll) {
    return super.deleteForceAllBase(ctx, payload, ShiftActions.DeleteForceAll.type);
  }

  @Action(ShiftActions.Restore)
  restore(ctx: StateContext<ShiftStateModel>, { id }: ShiftActions.Restore) {
    return super.restoreBase(ctx, id, ShiftActions.Restore.type);
  }

  @Action(ShiftActions.RestoreAll)
  restoreAll(ctx: StateContext<ShiftStateModel>, { payload }: ShiftActions.RestoreAll) {
    return super.restoreAllBase(ctx, payload, ShiftActions.RestoreAll.type);
  }

  @Action(ShiftActions.ClearAll)
  clearAll(ctx: StateContext<ShiftStateModel>) {
    return ctx.patchState(INITIAL_VALUES);
  }

  @Action(ShiftActions.ToggleItemSelection)
  toggleSelection(ctx: StateContext<ShiftStateModel>, { id, page }: ShiftActions.ToggleItemSelection) {
    return super.toggleSelectionItem(ctx, id, page);
  }

  @Action(ShiftActions.ToggleAllItems)
  toggleAll(ctx: StateContext<ShiftStateModel>, { selected, page }: ShiftActions.ToggleAllItems) {
    return super.toggleAllItem(ctx, selected, page);
  }

  @Action(ShiftActions.Filter)
  filter(ctx: StateContext<ShiftStateModel>, { payload, page, columns }: ShiftActions.Filter<Shift>) {
    return super.filterBase(ctx, payload, page, columns)
  }
}
