import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { UserAction } from './user.actions';
import { INITIAL_VALUES, User, UserRequest, UserStateModel } from '@models/masters/user.model';
import { BaseState } from '@shared/states/state-base/state-base.state';
import { UserService } from '@services/masters/user.service';
import { Sort } from '@shared/models/ui/sort.model';
import { tap } from 'rxjs';
import { ApiResSingle } from '@shared/models/bases/response.model';

@State<UserStateModel>({
  name: 'user',
  defaults: INITIAL_VALUES
})
@Injectable()
export class UserState extends BaseState<User, UserRequest> {
  constructor(private userService: UserService) {
    super(userService);
  }

  protected getSortField(): Sort<User> {
    return {
      field: 'name',
      type: 'string',
      direction: true
    };
  }
}
