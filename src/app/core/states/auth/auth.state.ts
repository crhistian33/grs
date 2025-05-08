import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { AuthActions } from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { SetLoading } from '@shared/states/loading/loading.actions';
import { AuthResponse } from '@shared/models/bases/response.model';
import { AuthStateModel, INITIAL_VALUES } from '@models/auth/auth.model';
import { tap } from 'rxjs';

@State<AuthStateModel>({
  name: 'auth',
  defaults: INITIAL_VALUES
})

@Injectable()
export class AuthState {
  private readonly service = inject(AuthService);
  private readonly router = inject(Router);

  @Selector()
  static getToken(state: AuthStateModel) {
    return state.access_token;
  }

  @Selector()
  static getRefreshToken(state: AuthStateModel) {
    return state.refresh_token;
  }

  @Selector()
  static getAuthenticated(state: AuthStateModel) {
    return state.isAuthenticated;
  }

  @Selector()
  static getUserProfile(state: AuthStateModel) {
    return state.user;
  }

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, payload: AuthActions.Login) {
    ctx.dispatch(new SetLoading(AuthActions.Login.type, true));
    const { email, password } = payload;

    return this.service.login(email, password)
      .pipe(
        tap({
          next: (response: AuthResponse) => {
            ctx.patchState({
              access_token: response.data.access_token,
              refresh_token: response.data.refresh_token,
              isAuthenticated: true,
            });
            ctx.dispatch(new AuthActions.Profile());
            this.router.navigateByUrl('/');
          },
          error: () => {
            ctx.dispatch(new SetLoading(AuthActions.Login.type, false));
          },
          finalize: () => {
            ctx.dispatch(new SetLoading(AuthActions.Login.type, false));
          }
        })
      )
  }

  @Action(AuthActions.Refresh)
  refresh(ctx: StateContext<AuthStateModel>) {
    const refresh_token = ctx.getState().refresh_token;

    if(!refresh_token)
      return;

    return this.service.refresh(refresh_token)
      .pipe(
        tap(
          (response: AuthResponse) => {
            ctx.patchState({
              access_token: response.data?.access_token,
              refresh_token: response.data?.refresh_token,
            });
          }
        )
      )
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new SetLoading(AuthActions.Logout.type, true));
    return this.service.logout().pipe(
      tap({
        next: () => {
          this.router.navigateByUrl('/auth/login');
          this.clear(ctx);
          ctx.dispatch(new SetLoading(AuthActions.Logout.type, false));
        },
        error: () => {
          ctx.dispatch(new SetLoading(AuthActions.Logout.type, false));
        }
      })
    );
  }

  @Action(AuthActions.Profile)
  profile(ctx: StateContext<AuthStateModel>) {
    const type = AuthActions.Profile.type;
    ctx.dispatch(new SetLoading(type, true));
    return this.service.profile().pipe(
      tap({
        next: (response) => {
          ctx.patchState({
            user: response.data
          });
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    );
  }

  @Action(AuthActions.ClearAll)
  clear(ctx: StateContext<AuthStateModel>) {
    return ctx.setState(INITIAL_VALUES);
  }
}
