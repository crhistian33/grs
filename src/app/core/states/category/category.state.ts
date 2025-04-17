import { Injectable } from '@angular/core';
import { Category, CategoryRequest, CategoryStateModel, INITIAL_VALUES } from '@models/masters/category.model';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CategoryService } from '@services/masters/category.service';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { CategoryActions } from './category.actions';

@State<CategoryStateModel>({
  name: 'category',
  defaults: INITIAL_VALUES
})
@Injectable()
export class CategoryState extends BaseState<Category, CategoryRequest> {
  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }

  @Selector()
  static getItems(state: CategoryStateModel) {
    return state.filterEntities;
  }

  // Acciones
  @Action(CategoryActions.GetAll)
  getAll(ctx: StateContext<CategoryStateModel>) {
    return super.getAllBase(ctx);
  }
}
