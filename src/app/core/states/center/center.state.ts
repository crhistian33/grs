import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Center, CenterResquest, CenterStateModel, INITIAL_VALUES } from '@models/masters/center.model';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { CenterService } from '@services/masters/center.service';
import { CenterActions } from '@states/center/center.actions';
import { Sort } from '@shared/models/ui/sort.model';

@State<CenterStateModel>({
  name: 'center',
  defaults: INITIAL_VALUES

})
@Injectable()
export class CenterState extends BaseState<Center, CenterResquest> {
  constructor(private centerService: CenterService) {
    super(centerService);
  }

  protected getSortField(): Sort<Center> {
    return {
      field: 'name',
      type: 'string',
      direction: true
    };
  }

  // Selectores
  @Selector()
  static getState(state: CenterStateModel) {
    return state;
  }

  @Selector()
  static getItems(state: CenterStateModel) {
    return state.filterEntities;
  }

  @Selector()
  static getItemsTrashed(state: CenterStateModel) {
    return state.filterTrashEntities;
  }

  @Selector()
  static getOptions(state: CenterStateModel) {
    return state.options ?? [];
  }

  @Selector()
  static getTrashes(state: CenterStateModel) {
    return state.trashes;
  }

  @Selector()
  static getLoading(state: CenterStateModel) {
    return state.loading;
  }

  @Selector()
  static getSelectedItems(state: CenterStateModel) {
    return state.entities.filter((entity) => entity.selected);
  }

  @Selector()
  static areAllSelected(state: CenterStateModel) {
    return (
      state.entities.length > 0 &&
      state.entities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasSelectedItems(state: CenterStateModel) {
    return state.entities.some((entity) => entity.selected);
  }

  @Selector()
  static getTrashedSelectedItems(state: CenterStateModel) {
    return state.trashEntities.filter((entity) => entity.selected);
  }

  @Selector()
  static areTrashedAllSelected(state: CenterStateModel) {
    return (
      state.trashEntities.length > 0 &&
      state.trashEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasTrashedSelectedItems(state: CenterStateModel) {
    return state.trashEntities.some((entity) => entity.selected);
  }

  // Acciones
  @Action(CenterActions.GetAll)
  getAll(ctx: StateContext<CenterStateModel>) {
    return super.getAllBase(ctx);
  }

  @Action(CenterActions.GetAllTrash)
  getAllTrash(ctx: StateContext<CenterStateModel>) {
    return super.getAllTrashBase(ctx);
  }

  @Action(CenterActions.GetOptions)
  getOptions(ctx: StateContext<CenterStateModel>) {
    return super.getOptionsBase(ctx);
  }

  @Action(CenterActions.GetOne)
  getOne(ctx: StateContext<CenterStateModel>, { id }: CenterActions.GetOne) {
    return super.getOneBase(ctx, id, CenterActions.GetOne.type);
  }

  @Action(CenterActions.Create)
  create(ctx: StateContext<CenterStateModel>, { payload }: CenterActions.Create) {
    return super.createBase(ctx, payload, CenterActions.Create.type);
  }

  @Action(CenterActions.Update)
  update(ctx: StateContext<CenterStateModel>, { payload, id }: CenterActions.Update) {
    return super.updateBase(ctx, payload, id, CenterActions.Update.type);
  }

  @Action(CenterActions.Delete)
  delete(ctx: StateContext<CenterStateModel>, { id }: CenterActions.Delete) {
    return super.deleteBase(ctx, id, CenterActions.Delete.type);
  }

  @Action(CenterActions.DeleteForce)
  deleteForce(ctx: StateContext<CenterStateModel>, { id }: CenterActions.DeleteForce) {
    return super.deleteForceBase(ctx, id, CenterActions.DeleteForce.type);
  }

  @Action(CenterActions.DeleteAll)
  deleteAll(ctx: StateContext<CenterStateModel>, { payload }: CenterActions.DeleteAll) {
    return super.deleteAllBase(ctx, payload, CenterActions.DeleteAll.type);
  }

  @Action(CenterActions.DeleteForceAll)
  deleteForceAll(ctx: StateContext<CenterStateModel>, { payload }: CenterActions.DeleteForceAll) {
    return super.deleteForceAllBase(ctx, payload, CenterActions.DeleteForceAll.type);
  }

  @Action(CenterActions.Restore)
  restore(ctx: StateContext<CenterStateModel>, { id }: CenterActions.Restore) {
    return super.restoreBase(ctx, id, CenterActions.Restore.type);
  }

  @Action(CenterActions.RestoreAll)
  restoreAll(ctx: StateContext<CenterStateModel>, { payload }: CenterActions.RestoreAll) {
    return super.restoreAllBase(ctx, payload, CenterActions.RestoreAll.type);
  }

  @Action(CenterActions.ClearAll)
  clearAll(ctx: StateContext<CenterStateModel>) {
    return ctx.patchState(INITIAL_VALUES);
  }

  @Action(CenterActions.ToggleItemSelection)
  toggleSelection(ctx: StateContext<CenterStateModel>, { id, page }: CenterActions.ToggleItemSelection) {
    return super.toggleSelectionItem(ctx, id, page);
  }

  @Action(CenterActions.ToggleAllItems)
  toggleAll(ctx: StateContext<CenterStateModel>, { selected, page }: CenterActions.ToggleAllItems) {
    return super.toggleAllItem(ctx, selected, page);
  }

  @Action(CenterActions.Filter)
  filter(ctx: StateContext<CenterStateModel>, { payload, page, columns }: CenterActions.Filter<Center>) {
    return super.filterBase(ctx, payload, page, columns)
  }
}
