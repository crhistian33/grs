import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LayoutAction } from './layout.actions';
import { LayoutStateModel } from '@shared/models/ui/layout.model';

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    title: 'Inicio'
  }
})
@Injectable()
export class LayoutState {

  @Selector()
  static getTitle(state: LayoutStateModel) {
    return state.title;
  }

  @Action(LayoutAction.SetTitle)
  setTitle(ctx: StateContext<LayoutStateModel>, { title }: LayoutAction.SetTitle) {
    ctx.patchState({ title });
  }

  @Action(LayoutAction.ClearTitle)
  clearTitle(ctx: StateContext<LayoutStateModel>) {
    ctx.patchState({ title: 'Inicio' });
  }
}
