import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '@states/auth/auth.state';

export const authGuard: CanMatchFn = (route, segments): MaybeAsync<GuardResult> => {
  const store = inject(Store);
  const router = inject(Router);

  const isAuthenticated = store.selectSnapshot(AuthState.getAuthenticated);

  return !isAuthenticated ? router.createUrlTree(['/auth/login']) : true;
};
