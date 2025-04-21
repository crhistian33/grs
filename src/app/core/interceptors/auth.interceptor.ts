import { HttpContext, HttpContextToken, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenService } from '@services/auth/token.service';
import { AuthActions } from '@states/auth/auth.actions';
import { BehaviorSubject, Observable, filter, finalize, switchMap, take } from 'rxjs';

// Definición del token de contexto
const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

// Función auxiliar para activar la verificación del token
export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

// Variables para controlar el proceso de renovación del token
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const store = inject(Store);

  // Solo procesar si se requiere verificación de token
  if (!req.context.get(CHECK_TOKEN)) {
    return next(req);
  }

  const token = tokenService.getToken();
  const isValidToken = tokenService.isValidToken();

  // Caso 1: No hay token, continuar sin modificaciones
  if (!token) {
    return next(req);
  }

  // Caso 2: Token válido, añadir a los encabezados
  if (isValidToken) {
    return next(addTokenHeader(req, token));
  }

  // Caso 3: Token inválido pero ya hay un proceso de renovación en curso
  if (isRefreshing) {
    return waitForRefresh(req, next);
  }

  // Caso 4: Token inválido, iniciar proceso de renovación
  return refreshAuthentication(req, next, tokenService, store);
};

// Función para añadir el token al encabezado
function addTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

// Función para esperar a que el proceso de renovación termine
function waitForRefresh(req: HttpRequest<unknown>, next: any): Observable<any> {
  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(token => next(addTokenHeader(req, token!)))
  );
}

// Función para manejar el proceso de renovación
function refreshAuthentication(
  req: HttpRequest<unknown>,
  next: any,
  tokenService: TokenService,
  store: Store
): Observable<any> {
  const refreshToken = tokenService.getRefreshToken();
  const isValidRefreshToken = tokenService.isValidRefreshToken();

  // Si no hay refreshToken válido, limpiar todo
  if (!refreshToken || !isValidRefreshToken) {
    store.dispatch(new AuthActions.ClearAll());
    return next(req);
  }

  // Iniciar proceso de renovación
  isRefreshing = true;
  refreshTokenSubject.next(null);

  return store.dispatch(new AuthActions.Refresh()).pipe(
    switchMap(() => {
      const newToken = tokenService.getToken();

      if (newToken) {
        refreshTokenSubject.next(newToken);
        return next(addTokenHeader(req, newToken));
      } else {
        store.dispatch(new AuthActions.ClearAll());
        return next(req);
      }
    }),
    finalize(() => {
      isRefreshing = false;
    })
  );
}
