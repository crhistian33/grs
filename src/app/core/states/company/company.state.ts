import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { Company, CompanyResquest, CompanyStateModel, INITIAL_VALUES } from '@models/masters/company.model';
import { CompanyService } from '@services/masters/company.service';
import { CompanyActions } from './company.actions';

@State<CompanyStateModel>({
  name: 'company',
  defaults: INITIAL_VALUES

})
@Injectable()
export class CompanyState extends BaseState<Company, CompanyResquest> {
  constructor(private companyService: CompanyService) {
    super(companyService);
  }

  // Selectores
  @Selector()
  static getState(state: CompanyStateModel) {
    return state;
  }

  @Selector()
  static getItems(state: CompanyStateModel) {
    return state.filterEntities;
  }

  @Selector()
  static getItemsTrashed(state: CompanyStateModel) {
    return state.filterTrashEntities;
  }

  @Selector()
  static getTrashes(state: CompanyStateModel) {
    return state.trashes;
  }

  @Selector()
  static getLoading(state: CompanyStateModel) {
    return state.loading;
  }

  @Selector()
  static getSelectedItems(state: CompanyStateModel) {
    return state.entities.filter((entity) => entity.selected);
  }

  @Selector()
  static areAllSelected(state: CompanyStateModel) {
    return (
      state.entities.length > 0 &&
      state.entities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasSelectedItems(state: CompanyStateModel) {
    return state.entities.some((entity) => entity.selected);
  }

  @Selector()
  static getTrashedSelectedItems(state: CompanyStateModel) {
    return state.trashEntities.filter((entity) => entity.selected);
  }

  @Selector()
  static areTrashedAllSelected(state: CompanyStateModel) {
    return (
      state.trashEntities.length > 0 &&
      state.trashEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasTrashedSelectedItems(state: CompanyStateModel) {
    return state.trashEntities.some((entity) => entity.selected);
  }

  // Acciones
  @Action(CompanyActions.GetAll)
  getAll(ctx: StateContext<CompanyStateModel>) {
    return super.getAllBase(ctx);
  }

  @Action(CompanyActions.GetAllTrash)
  getAllTrash(ctx: StateContext<CompanyStateModel>) {
    return super.getAllTrashBase(ctx);
  }

  @Action(CompanyActions.GetOne)
  getOne(ctx: StateContext<CompanyStateModel>, { id }: CompanyActions.GetOne) {
    return super.getOneBase(ctx, id, CompanyActions.GetOne.type);
  }

  @Action(CompanyActions.Create)
  create(ctx: StateContext<CompanyStateModel>, { payload }: CompanyActions.Create) {
    return super.createBase(ctx, payload, CompanyActions.Create.type);
  }

  @Action(CompanyActions.Update)
  update(ctx: StateContext<CompanyStateModel>, { payload, id }: CompanyActions.Update) {
    return super.updateBase(ctx, payload, id, CompanyActions.Update.type);
  }

  @Action(CompanyActions.Delete)
  delete(ctx: StateContext<CompanyStateModel>, { id }: CompanyActions.Delete) {
    return super.deleteBase(ctx, id, CompanyActions.Delete.type);
  }

  @Action(CompanyActions.DeleteForce)
  deleteForce(ctx: StateContext<CompanyStateModel>, { id }: CompanyActions.DeleteForce) {
    return super.deleteForceBase(ctx, id, CompanyActions.DeleteForce.type);
  }

  @Action(CompanyActions.DeleteAll)
  deleteAll(ctx: StateContext<CompanyStateModel>, { payload }: CompanyActions.DeleteAll) {
    return super.deleteAllBase(ctx, payload, CompanyActions.DeleteAll.type);
  }

  @Action(CompanyActions.DeleteForceAll)
  deleteForceAll(ctx: StateContext<CompanyStateModel>, { payload }: CompanyActions.DeleteForceAll) {
    return super.deleteForceAllBase(ctx, payload, CompanyActions.DeleteForceAll.type);
  }

  @Action(CompanyActions.Restore)
  restore(ctx: StateContext<CompanyStateModel>, { id }: CompanyActions.Restore) {
    return super.restoreBase(ctx, id, CompanyActions.Restore.type);
  }

  @Action(CompanyActions.RestoreAll)
  restoreAll(ctx: StateContext<CompanyStateModel>, { payload }: CompanyActions.RestoreAll) {
    return super.restoreAllBase(ctx, payload, CompanyActions.RestoreAll.type);
  }

  @Action(CompanyActions.ClearAll)
  clearAll(ctx: StateContext<CompanyStateModel>) {
    return ctx.patchState(INITIAL_VALUES);
  }

  @Action(CompanyActions.ToggleItemSelection)
  toggleSelection(ctx: StateContext<CompanyStateModel>, { id, page }: CompanyActions.ToggleItemSelection) {
    return super.toggleSelectionItem(ctx, id, page);
  }

  @Action(CompanyActions.ToggleAllItems)
  toggleAll(ctx: StateContext<CompanyStateModel>, { selected, page }: CompanyActions.ToggleAllItems) {
    return super.toggleAllItem(ctx, selected, page);
  }

  @Action(CompanyActions.Filter)
  filter(ctx: StateContext<CompanyStateModel>, { payload, page, columns }: CompanyActions.Filter<Company>) {
    return super.filterBase(ctx, payload, page, columns)
  }
}
