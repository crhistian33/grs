import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ITableHeader } from '@shared/models/bases/table-headers.model';
import { Store } from '@ngxs/store';
import { ModalService } from '@shared/services/ui/modal.service';
import { ToastService } from '@shared/services/ui/toast.service';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { HeaderContentComponent } from '@shared/components/header-content/header-content.component';
import { ACTIONS, ICONS, IDS, MESSAGES, SEVERITIES, TITLES, TYPES } from '@shared/utils/constants';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Worker } from '@models/masters/worker.model';
import { WORKER_TABLE_HEADERS } from '@table-headers/worker-headers';
import { WorkerState } from '@states/worker/worker.state';
import { WorkerActions } from '@states/worker/worker.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { APP_FILTERS } from 'src/app/core/definitions/filters';
import { CompanyActions } from '@states/company/company.actions';
import { TypeWorkerActions } from '@states/typeworker/typeworker.actions';
import { ActionService } from '@shared/services/ui/action.service';

@Component({
  selector: 'app-trashed',
  imports: [CommonModule, HeaderContentComponent, DataTableComponent, ConfirmDialog, ButtonModule, FilterComponent],
  templateUrl: './trashed.component.html',
  styleUrl: './trashed.component.scss'
})
export class TrashedComponent implements OnInit {
  private store = inject(Store);
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private actionService = inject(ActionService);
  private destroy$ = new Subject<void>();

  title: string = TITLES.RECYCLE;
  typePage: string = TYPES.RECYCLE;
  headers: ITableHeader<Worker>[] = WORKER_TABLE_HEADERS;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.WORKER));

  workers$: Observable<Worker[]> = this.store.select(WorkerState.getItemsTrashed);
  areAllSelected$: Observable<boolean> = this.store.select(WorkerState.areTrashedAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(WorkerState.hasTrashedSelectedItems);
  selectedItems$: Observable<Worker[]> = this.store.select(WorkerState.getTrashedSelectedItems);
  loading$: Observable<boolean> = this.store.select(WorkerState.getLoading);

  ngOnInit(): void {
    this.actionService.execActions([
      new LayoutAction.SetTitle(TITLES.WORKERS),
      new WorkerActions.GetAllTrash(),
      new CompanyActions.GetOptions(),
      new TypeWorkerActions.GetOptions()
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(new LayoutAction.ClearTitle());
  }

  onRestore(item: any) {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_RESTORE,
      MESSAGES.MESSAGE_RESTORE,
      ACTIONS.RESTORE,
      SEVERITIES.INFO,
      ICONS.EXC_INFO,
      () => {
      this.store.dispatch(new WorkerActions.Restore(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.worker.result;
        this.toastService.notification(result.title, result.message, 'success', 4000);
      });
    });
  }

  onDelete(item: any) {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_DELETE,
      MESSAGES.MESSAGE_DELETE_FORCE,
      ACTIONS.DELETE,
      SEVERITIES.DANGER,
      ICONS.EXC_DANGER,
      () => {
      this.store.dispatch(new WorkerActions.DeleteForce(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.worker.result;
        this.toastService.notification(result.title, result.message, 'success', 4000);
      });
    });
  }

  onRestoreAll() {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_RESTORE_ALL,
      MESSAGES.MESSAGE_RESTORE_ALL,
      ACTIONS.RESTORE,
      SEVERITIES.INFO,
      ICONS.EXC_INFO,
      () => {
        this.selectedItems$.pipe(take(1)).subscribe((data) => {
          this.store.dispatch(new WorkerActions.RestoreAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.worker.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onDeleteAll() {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_DELETE_ALL,
      MESSAGES.MESSAGE_DELETE_FORCE_ALL,
      ACTIONS.DELETE,
      SEVERITIES.DANGER,
      ICONS.EXC_DANGER,
      () => {
        this.selectedItems$.pipe(take(1)).subscribe((data) => {
          this.store.dispatch(new WorkerActions.DeleteForceAll(data))
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
    this.store.dispatch(new WorkerActions.ToggleItemSelection(id, TYPES.RECYCLE));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new WorkerActions.ToggleAllItems(checked, TYPES.RECYCLE));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new WorkerActions.Filter(filter, TYPES.RECYCLE, columns));
  }
}
