import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { Customer, CustomerResquest, CustomerStateModel, INITIAL_VALUES } from '@models/masters/customer.model';
import { CustomerService } from '@services/masters/customer.service';
import { CustomerActions } from './customer.actions';

@State<CustomerStateModel>({
  name: 'customer',
  defaults: INITIAL_VALUES

})
@Injectable()
export class CustomerState extends BaseState<Customer, CustomerResquest> {
  constructor(private customerService: CustomerService) {
    super(customerService);
  }

  // Selectores
  @Selector()
  static getState(state: CustomerStateModel) {
    return state;
  }

  @Selector()
  static getItems(state: CustomerStateModel) {
    return state.filterEntities;
  }

  @Selector()
  static getItemsTrashed(state: CustomerStateModel) {
    return state.filterTrashEntities;
  }

  @Selector()
  static getTrashes(state: CustomerStateModel) {
    return state.trashes;
  }

  @Selector()
  static getLoading(state: CustomerStateModel) {
    return state.loading;
  }

  @Selector()
  static getSelectedItems(state: CustomerStateModel) {
    return state.entities.filter((entity) => entity.selected);
  }

  @Selector()
  static areAllSelected(state: CustomerStateModel) {
    return (
      state.entities.length > 0 &&
      state.entities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasSelectedItems(state: CustomerStateModel) {
    return state.entities.some((entity) => entity.selected);
  }

  @Selector()
  static getTrashedSelectedItems(state: CustomerStateModel) {
    return state.trashEntities.filter((entity) => entity.selected);
  }

  @Selector()
  static areTrashedAllSelected(state: CustomerStateModel) {
    return (
      state.trashEntities.length > 0 &&
      state.trashEntities.every((entity) => entity.selected)
    );
  }

  @Selector()
  static hasTrashedSelectedItems(state: CustomerStateModel) {
    return state.trashEntities.some((entity) => entity.selected);
  }

  // Acciones
  @Action(CustomerActions.GetAll)
  getAll(ctx: StateContext<CustomerStateModel>) {
    return super.getAllBase(ctx);
  }

  @Action(CustomerActions.GetAllTrash)
  getAllTrash(ctx: StateContext<CustomerStateModel>) {
    return super.getAllTrashBase(ctx);
  }

  @Action(CustomerActions.GetOne)
  getOne(ctx: StateContext<CustomerStateModel>, { id }: CustomerActions.GetOne) {
    return super.getOneBase(ctx, id, CustomerActions.GetOne.type);
  }

  @Action(CustomerActions.Create)
  create(ctx: StateContext<CustomerStateModel>, { payload }: CustomerActions.Create) {
    return super.createBase(ctx, payload, CustomerActions.Create.type);
  }

  @Action(CustomerActions.Update)
  update(ctx: StateContext<CustomerStateModel>, { payload, id }: CustomerActions.Update) {
    return super.updateBase(ctx, payload, id, CustomerActions.Update.type);
  }

  @Action(CustomerActions.Delete)
  delete(ctx: StateContext<CustomerStateModel>, { id }: CustomerActions.Delete) {
    return super.deleteBase(ctx, id, CustomerActions.Delete.type);
  }

  @Action(CustomerActions.DeleteForce)
  deleteForce(ctx: StateContext<CustomerStateModel>, { id }: CustomerActions.DeleteForce) {
    return super.deleteForceBase(ctx, id, CustomerActions.DeleteForce.type);
  }

  @Action(CustomerActions.DeleteAll)
  deleteAll(ctx: StateContext<CustomerStateModel>, { payload }: CustomerActions.DeleteAll) {
    return super.deleteAllBase(ctx, payload, CustomerActions.DeleteAll.type);
  }

  @Action(CustomerActions.DeleteForceAll)
  deleteForceAll(ctx: StateContext<CustomerStateModel>, { payload }: CustomerActions.DeleteForceAll) {
    return super.deleteForceAllBase(ctx, payload, CustomerActions.DeleteForceAll.type);
  }

  @Action(CustomerActions.Restore)
  restore(ctx: StateContext<CustomerStateModel>, { id }: CustomerActions.Restore) {
    return super.restoreBase(ctx, id, CustomerActions.Restore.type);
  }

  @Action(CustomerActions.RestoreAll)
  restoreAll(ctx: StateContext<CustomerStateModel>, { payload }: CustomerActions.RestoreAll) {
    return super.restoreAllBase(ctx, payload, CustomerActions.RestoreAll.type);
  }

  @Action(CustomerActions.ClearAll)
  clearAll(ctx: StateContext<CustomerStateModel>) {
    return ctx.patchState(INITIAL_VALUES);
  }

  @Action(CustomerActions.ToggleItemSelection)
  toggleSelection(ctx: StateContext<CustomerStateModel>, { id, page }: CustomerActions.ToggleItemSelection) {
    return super.toggleSelectionItem(ctx, id, page);
  }

  @Action(CustomerActions.ToggleAllItems)
  toggleAll(ctx: StateContext<CustomerStateModel>, { selected, page }: CustomerActions.ToggleAllItems) {
    return super.toggleAllItem(ctx, selected, page);
  }

  @Action(CustomerActions.Filter)
  filter(ctx: StateContext<CustomerStateModel>, { payload, page, columns }: CustomerActions.Filter<Customer>) {
    return super.filterBase(ctx, payload, page, columns)
  }
}
