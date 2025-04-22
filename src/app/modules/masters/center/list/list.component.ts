import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { HeaderContentComponent } from '@shared/components/header-content/header-content.component';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ModalService } from '@shared/services/ui/modal.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ITableHeader } from '@shared/models/bases/table-headers.model';
import { ACTIONS, ICONS, MESSAGES, SEVERITIES, TITLES, TYPES } from '@shared/utils/constants';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { ToastService } from '@shared/services/ui/toast.service';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { FilterOptions, FilterStateModel } from '@shared/models/ui/filter.model';
import { CENTER_TABLE_HEADERS } from '@table-headers/center-headers';
import { Center } from '@models/masters/center.model';
import { CenterState } from '@states/center/center.state';
import { CenterActions } from '@states/center/center.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';

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

  headers: ITableHeader<Center>[] = CENTER_TABLE_HEADERS;
  title: string = TITLES.LIST_CENTER;
  typePage: string = TYPES.LIST;
  fieldsFilter: FilterOptions = {
    search: true
  }

  centers$: Observable<Center[]> = this.store.select(CenterState.getItems);
  areAllSelected$: Observable<boolean> = this.store.select(CenterState.areAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(CenterState.hasSelectedItems);
  selectedItems$: Observable<Center[]> = this.store.select(CenterState.getSelectedItems);
  loading$: Observable<boolean> = this.store.select(CenterState.getLoading);
  trashes$: Observable<number> = this.store.select(CenterState.getTrashes);

  ngOnInit(): void {
    this.store.dispatch([
      new LayoutAction.SetTitle('Centros'),
      new CenterActions.GetAll
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch([
      new LayoutAction.ClearTitle,
      new CenterActions.ClearAll
    ]);
  }

  onCreate() {
    this.modalService.onModalForm(FormComponent, TITLES.CREATE_CENTER);
  }

  onUpdate(item: any) {
    this.modalService.onModalForm(FormComponent, TITLES.UPDATE_CENTER, item);
  }

  onDelete(item: any) {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_DELETE,
      MESSAGES.MESSAGE_DELETE,
      ACTIONS.DELETE,
      SEVERITIES.DANGER,
      ICONS.EXC_DANGER,
      () => {
        this.store.dispatch(new CenterActions.Delete(item.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          const result = response.center.result;
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
          this.store.dispatch(new CenterActions.DeleteAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.center.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onToggleItem(id: number) {
    this.store.dispatch(new CenterActions.ToggleItemSelection(id, TYPES.LIST));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new CenterActions.ToggleAllItems(checked, TYPES.LIST));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new CenterActions.Filter(filter, TYPES.LIST, columns));
  }
}
