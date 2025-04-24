import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@shared/services/ui/toast.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorTitle = 'Error';
      let errorMessage = 'Ocurrió un error inesperado en el servidor';

      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }

      toastService.notification(errorTitle, errorMessage, 'error', 4000);

      if(error.status === 401)
        router.navigateByUrl('/auth/login');

      return throwError(() => error);
    })
  );
};
