import { Injectable } from '@angular/core';
import { Category, CategoryRequest, CategoryStateModel, INITIAL_VALUES } from '@models/masters/category.model';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CategoryService } from '@services/masters/category.service';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { CategoryActions } from './category.actions';
import { Sort } from '@shared/models/ui/sort.model';

@State<CategoryStateModel>({
  name: 'category',
  defaults: INITIAL_VALUES
})
@Injectable()
export class CategoryState extends BaseState<Category, CategoryRequest> {
  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }

  protected getSortField(): Sort<Category> {
    return {
      field: 'name',
      type: 'string',
      direction: true
    };
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
