import { HttpContext, HttpContextToken, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenService } from '@services/auth/token.service';
import { AuthActions } from '@states/auth/auth.actions';
import { BehaviorSubject, filter, switchMap, take } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const store = inject(Store);

  console.log(req.context.get(CHECK_TOKEN));

  if (req.context.get(CHECK_TOKEN)) {
    const token = tokenService.getToken();
    const isValidToken = tokenService.isValidToken();

    if(token) {
      if(isValidToken) {
        req = addTokenHeader(req, token);
      } else if(!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        const refreshToken = tokenService.getRefreshToken();
        const isValidRefreshToken = tokenService.isValidRefreshToken();

        if (refreshToken && isValidRefreshToken) {
          return store.dispatch(new AuthActions.Refresh()).pipe(
            switchMap(() => {
              isRefreshing = false;
              const newToken = tokenService.getToken();

              if (newToken) {
                refreshTokenSubject.next(newToken);
                return next(addTokenHeader(req, newToken));
              } else {
                store.dispatch(new AuthActions.Logout());
                return next(req);
              }
            })
          );
        }
      } else {
        return refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => next(addTokenHeader(req, token!)))
        );
      }

    }
  }

  return next(req);
};

function addTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

