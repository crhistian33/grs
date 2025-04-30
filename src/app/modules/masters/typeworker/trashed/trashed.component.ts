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
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { TYPEWORKER_TABLE_HEADERS } from '@table-headers/typeworker-headers';
import { TypeWorker } from '@models/masters/typeworker.model';
import { TypeWorkerState } from '@states/typeworker/typeworker.state';
import { TypeWorkerActions } from '@states/typeworker/typeworker.actions';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { APP_FILTERS } from 'src/app/core/definitions/filters';

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
  private destroy$ = new Subject<void>();

  title: string = TITLES.RECYCLE;
  typePage: string = TYPES.RECYCLE;
  headers: ITableHeader<TypeWorker>[] = TYPEWORKER_TABLE_HEADERS;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.TYPEWORKER));

  typeworkers$: Observable<TypeWorker[]> = this.store.select(TypeWorkerState.getItemsTrashed);
  areAllSelected$: Observable<boolean> = this.store.select(TypeWorkerState.areTrashedAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(TypeWorkerState.hasTrashedSelectedItems);
  selectedItems$: Observable<TypeWorker[]> = this.store.select(TypeWorkerState.getTrashedSelectedItems);
  loading$: Observable<boolean> = this.store.select(TypeWorkerState.getLoading);

  ngOnInit(): void {
    this.store.dispatch(new LayoutAction.SetTitle(TITLES.TYPEWORKERS))
    this.store.dispatch(new TypeWorkerActions.GetAllTrash());
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
      this.store.dispatch(new TypeWorkerActions.Restore(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.typeWorker.result;
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
      this.store.dispatch(new TypeWorkerActions.DeleteForce(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.typeWorker.result;
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
          this.store.dispatch(new TypeWorkerActions.RestoreAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.typeWorker.result;
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
          this.store.dispatch(new TypeWorkerActions.DeleteForceAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.typeWorker.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onToggleItem(id: number) {
    this.store.dispatch(new TypeWorkerActions.ToggleItemSelection(id, TYPES.RECYCLE));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new TypeWorkerActions.ToggleAllItems(checked, TYPES.RECYCLE));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new TypeWorkerActions.Filter(filter, TYPES.RECYCLE, columns));
  }
}
