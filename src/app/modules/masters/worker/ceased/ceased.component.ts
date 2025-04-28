import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Worker } from '@models/masters/worker.model';
import { Store } from '@ngxs/store';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { HeaderContentComponent } from '@shared/components/header-content/header-content.component';
import { ITableHeader } from '@shared/models/bases/table-headers.model';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { ModalService } from '@shared/services/ui/modal.service';
import { ToastService } from '@shared/services/ui/toast.service';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { ACTIONS, ICONS, IDS, MESSAGES, SEVERITIES, TITLES, TYPES } from '@shared/utils/constants';
import { CompanyActions } from '@states/company/company.actions';
import { TypeWorkerActions } from '@states/typeworker/typeworker.actions';
import { WorkerActions } from '@states/worker/worker.actions';
import { WorkerState } from '@states/worker/worker.state';
import { WORKER_TABLE_HEADERS } from '@table-headers/worker-headers';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { APP_FILTERS } from 'src/app/core/definitions/filters';
import { RenewComponent } from '../renew/renew.component';

@Component({
  selector: 'app-ceased',
  imports: [CommonModule, HeaderContentComponent, DataTableComponent, ConfirmDialog, ButtonModule, FilterComponent],
  templateUrl: './ceased.component.html',
  styleUrl: './ceased.component.scss'
})
export class CeasedComponent {
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  headers: ITableHeader<Worker>[] = WORKER_TABLE_HEADERS;
  title: string = TITLES.CEASED;
  typePage: string = TYPES.CEASED;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.WORKER));

  workers$: Observable<Worker[]> = this.store.select(WorkerState.getItems);
  areAllSelected$: Observable<boolean> = this.store.select(WorkerState.areAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(WorkerState.hasSelectedItems);
  selectedItems$: Observable<Worker[]> = this.store.select(WorkerState.getSelectedItems);
  loading$: Observable<boolean> = this.store.select(WorkerState.getLoading);

  ngOnInit(): void {
    this.store.dispatch([
      new LayoutAction.SetTitle(TITLES.WORKERS),
      new WorkerActions.GetAllCeased(),
      new CompanyActions.GetAll(),
      new TypeWorkerActions.GetAll()
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch([
      new LayoutAction.ClearTitle(),
      new WorkerActions.ClearAll(),
      new CompanyActions.ClearAll(),
      new TypeWorkerActions.ClearAll()
    ]);
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
