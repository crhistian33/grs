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
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { ToastService } from '@shared/services/ui/toast.service';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { TYPEWORKER_TABLE_HEADERS } from '@table-headers/typeworker-headers';
import { TypeWorker } from '@models/masters/typeworker.model';
import { TypeWorkerState } from '@states/typeworker/typeworker.state';
import { TypeWorkerActions } from '@states/typeworker/typeworker.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { APP_FILTERS } from 'src/app/core/definitions/filters';

@Component({
  selector: 'app-list',
  imports: [CommonModule, HeaderContentComponent, DataTableComponent, ConfirmDialog, ButtonModule, FilterComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})

export class ListComponent implements OnInit, OnDestroy {
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  headers: ITableHeader<TypeWorker>[] = TYPEWORKER_TABLE_HEADERS;
  title: string = TITLES.LIST;
  typePage: string = TYPES.LIST;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.TYPEWORKER));

  typeworkers$: Observable<TypeWorker[]> = this.store.select(TypeWorkerState.getItems);
  areAllSelected$: Observable<boolean> = this.store.select(TypeWorkerState.areAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(TypeWorkerState.hasSelectedItems);
  selectedItems$: Observable<TypeWorker[]> = this.store.select(TypeWorkerState.getSelectedItems);
  loading$: Observable<boolean> = this.store.select(TypeWorkerState.getLoading);
  trashes$: Observable<number> = this.store.select(TypeWorkerState.getTrashes);

  ngOnInit(): void {
    this.store.dispatch(new LayoutAction.SetTitle(TITLES.TYPEWORKERS));
    this.store.dispatch(new TypeWorkerActions.GetAll());
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

  onDelete(item: any) {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_DELETE,
      MESSAGES.MESSAGE_DELETE,
      ACTIONS.DELETE,
      SEVERITIES.DANGER,
      ICONS.EXC_DANGER,
      () => {
        this.store.dispatch(new TypeWorkerActions.Delete(item.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          const result = response.typeWorker.result;
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
          this.store.dispatch(new TypeWorkerActions.DeleteAll(data))
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
    this.store.dispatch(new TypeWorkerActions.ToggleItemSelection(id, TYPES.LIST));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new TypeWorkerActions.ToggleAllItems(checked, TYPES.LIST));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new TypeWorkerActions.Filter(filter, TYPES.LIST, columns));
  }
}
