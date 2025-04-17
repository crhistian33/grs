import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { HeaderContentComponent } from '@shared/components/header-content/header-content.component';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ModalService } from '@shared/services/ui/modal.service';
import { Demo } from '@models/masters/demo.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ITableHeader } from '@shared/models/bases/table-headers.model';
import { DEMO_TABLE_HEADERS } from '@table-headers/demo-headers';
import { ACTIONS, ICONS, MESSAGES, SEVERITIES, TITLES, TYPES } from '@shared/utils/constants';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { DemoState } from '@states/demo/demo.state';
import { DemoActions } from '@states/demo/demo.actions';
import { ToastService } from '@shared/services/ui/toast.service';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { FilterOptions } from '@shared/models/ui/filter.model';
import { CategoryActions } from '@states/category/category.actions';

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

  headers: ITableHeader<Demo>[] = DEMO_TABLE_HEADERS;
  title: string = TITLES.LIST_DEMO;
  typePage: string = TYPES.LIST;

  demos$: Observable<Demo[]> = this.store.select(DemoState.getItems);
  areAllSelected$: Observable<boolean> = this.store.select(DemoState.areAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(DemoState.hasSelectedItems);
  selectedItems$: Observable<Demo[]> = this.store.select(DemoState.getSelectedItems);
  loading$: Observable<boolean> = this.store.select(DemoState.getLoading);
  trashes$: Observable<number> = this.store.select(DemoState.getTrashes);

  ngOnInit(): void {
    this.store.dispatch(new DemoActions.GetAll);
    this.store.dispatch(new CategoryActions.GetAll);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(new DemoActions.ClearAll);
  }

  onCreate() {
    this.modalService.onModalForm(FormComponent, TITLES.CREATE_DEMO);
  }

  onUpdate(item: any) {
    this.modalService.onModalForm(FormComponent, TITLES.UPDATE_DEMO, item);
  }

  onDelete(item: any) {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_DELETE,
      MESSAGES.MESSAGE_DELETE,
      ACTIONS.DELETE,
      SEVERITIES.DANGER,
      ICONS.EXC_DANGER,
      () => {
        this.store.dispatch(new DemoActions.Delete(item.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          const result = response.demo.result;
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
          this.store.dispatch(new DemoActions.DeleteAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.demo.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onToggleItem(id: number) {
    this.store.dispatch(new DemoActions.ToggleItemSelection(id, TYPES.LIST));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new DemoActions.ToggleAllItems(checked, TYPES.LIST));
  }

  onFilterData(filter: FilterOptions) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new DemoActions.Filter(filter, TYPES.LIST, columns));
  }
}
