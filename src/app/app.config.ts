import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { DemoState } from '@states/demo/demo.state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalService } from '@shared/services/ui/modal.service';
import { LoadingState } from '@shared/states/loading/loading.state';
import { errorInterceptor } from '@interceptors/error.interceptor';
import { BreadcrumbState } from '@shared/states/breadcrumb/breadcrumb.state';
import { AuthState } from '@states/auth/auth.state';
import { authInterceptor } from '@interceptors/auth.interceptor';
import { CategoryState } from '@states/category/category.state';
import { CenterState } from '@states/center/center.state';
import { CompanyState } from '@states/company/company.state';
import { CustomerState } from '@states/customer/customer.state';
import { UnitState } from '@states/unit/unit.state';
import { ShiftState } from '@states/shift/shift.state';
import { TypeWorkerState } from '@states/typeworker/typeworker.state';
import { WorkerState } from '@states/worker/worker.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          },
        }
      }
    }),
    provideHttpClient(withInterceptors([
      errorInterceptor,
      authInterceptor
    ])),
    provideStore(
      [
        AuthState,
        LoadingState,
        BreadcrumbState,
        CenterState,
        CompanyState,
        CustomerState,
        UnitState,
        ShiftState,
        TypeWorkerState,
        WorkerState,
      ],
      withNgxsStoragePlugin({
        keys: ['auth'],
        storage: 0
      }),
      //withNgxsReduxDevtoolsPlugin(),
      //withNgxsFormPlugin(),
      withNgxsLoggerPlugin(),
    ),
    MessageService,
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    ModalService,
    ConfirmationService
  ]
};
