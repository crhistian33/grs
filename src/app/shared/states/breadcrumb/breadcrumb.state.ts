import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { BreadcrumbActions } from './breadcrumb.actions';
import { Breadcrumb, BreadcrumbStateModel } from '@shared/models/ui/breadcrumb.model';
import { MenuItem } from 'primeng/api';

@State<BreadcrumbStateModel>({
  name: 'breadcrumb',
  defaults: {
    breadcrumbs: []
  }
})
@Injectable()
export class BreadcrumbState {

  @Selector()
  static getBreadcrumbs(state: BreadcrumbStateModel): MenuItem[] {
    return state.breadcrumbs;
  }

  @Action(BreadcrumbActions)
  updateBreadcrumbs(ctx: StateContext<BreadcrumbStateModel>, action: BreadcrumbActions) {
    ctx.setState({
      breadcrumbs: action.breadcrumbs
    });
  }
}
