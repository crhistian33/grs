import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { HeaderContentComponent } from '@shared/components/header-content/header-content.component';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ModalService } from '@shared/services/ui/modal.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ITableHeader } from '@shared/models/bases/table-headers.model';
import { ACTIONS, ICONS, IDS, MESSAGES, SEVERITIES, TITLES, TYPES } from '@shared/utils/constants';
import { forkJoin, Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { ToastService } from '@shared/services/ui/toast.service';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { WORKER_TABLE_HEADERS } from '@table-headers/worker-headers';
import { Worker } from '@models/masters/worker.model';
import { WorkerState } from '@states/worker/worker.state';
import { WorkerActions } from '@states/worker/worker.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { CompanyActions } from '@states/company/company.actions';
import { TypeWorkerActions } from '@states/typeworker/typeworker.actions';
import { APP_FILTERS } from 'src/app/core/definitions/filters';
import { RenewComponent } from '../renew/renew.component';
import { ActionService } from '@shared/services/ui/action.service';
import { AuthState } from '@states/auth/auth.state';
import { Roles, UserRole } from '@models/masters/user.model';

@Component({
  selector: 'app-list',
  imports: [CommonModule, HeaderContentComponent, DataTableComponent, ConfirmDialog, ButtonModule, FilterComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})

export class ListComponent implements OnInit, OnDestroy {
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private actionService = inject(ActionService);
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  headers: ITableHeader<Worker>[] = [];
  title: string = TITLES.LIST;
  typePage: string = TYPES.LIST;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.WORKER));
  Roles = Roles;

  workers$: Observable<Worker[]> = this.store.select(WorkerState.getItems);
  areAllSelected$: Observable<boolean> = this.store.select(WorkerState.areAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(WorkerState.hasSelectedItems);
  selectedItems$: Observable<Worker[]> = this.store.select(WorkerState.getSelectedItems);
  loading$: Observable<boolean> = this.store.select(WorkerState.getLoading);
  trashes$: Observable<number> = this.store.select(WorkerState.getTrashes);

  ngOnInit(): void {
    const rol = this.store.selectSnapshot(AuthState.getUserProfile)?.role.name;
    let actions = [
      new LayoutAction.SetTitle(TITLES.WORKERS),
      new WorkerActions.GetAll(),
      new TypeWorkerActions.GetOptions()
    ];

    if(rol === Roles.ADMIN)
      actions.push(new CompanyActions.GetOptions());

    this.actionService.execActions(actions);

    this.headers = WORKER_TABLE_HEADERS.filter(header => {
      if (header.roles) {
        return header.roles.includes(rol as UserRole);
      }
      return true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(new LayoutAction.ClearTitle());
  }

  onCreate() {
    this.modalService.onModalForm(FormComponent, TITLES.CREATE);
  }

  onUpdate(item: any) {
    this.modalService.onModalForm(FormComponent, TITLES.UPDATE, item);
  }

  onRenew(item: any) {
    this.modalService.onModalForm(RenewComponent, TITLES.RENEW, item);
  }

  onDelete(item: any) {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_DELETE,
      MESSAGES.MESSAGE_DELETE,
      ACTIONS.DELETE,
      SEVERITIES.DANGER,
      ICONS.EXC_DANGER,
      () => {
        this.store.dispatch(new WorkerActions.Delete(item.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          const result = response.worker.result;
          this.toastService.notification(result.title, result.message, 'success', 4000);
        });
      }
    );
  }

  onDeleteAll() {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_DELETE_ALL,
      MESSAGES.MESSAGE_DELETE_ALL,
      ACTIONS.DELETE,
      SEVERITIES.DANGER,
      ICONS.EXC_DANGER,
      () => {
        this.selectedItems$.pipe(take(1)).subscribe((data) => {
          this.store.dispatch(new WorkerActions.DeleteAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.worker.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onToggleItem(id: number) {
    this.store.dispatch(new WorkerActions.ToggleItemSelection(id, TYPES.LIST));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new WorkerActions.ToggleAllItems(checked, TYPES.LIST));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new WorkerActions.Filter(filter, TYPES.LIST, columns));
  }
}
