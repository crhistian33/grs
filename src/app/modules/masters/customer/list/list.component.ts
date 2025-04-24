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
import { CUSTOMER_TABLE_HEADERS } from '@table-headers/customer-headers';
import { Customer } from '@models/masters/customer.model';
import { CustomerState } from '@states/customer/customer.state';
import { CustomerActions } from '@states/customer/customer.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { CompanyActions } from '@states/company/company.actions';
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

  headers: ITableHeader<Customer>[] = CUSTOMER_TABLE_HEADERS;
  title: string = TITLES.LIST;
  typePage: string = TYPES.LIST;

  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.CUSTOMER));

  customers$: Observable<Customer[]> = this.store.select(CustomerState.getItems);
  areAllSelected$: Observable<boolean> = this.store.select(CustomerState.areAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(CustomerState.hasSelectedItems);
  selectedItems$: Observable<Customer[]> = this.store.select(CustomerState.getSelectedItems);
  loading$: Observable<boolean> = this.store.select(CustomerState.getLoading);
  trashes$: Observable<number> = this.store.select(CustomerState.getTrashes);

  ngOnInit(): void {
    this.store.dispatch([
      new LayoutAction.SetTitle(TITLES.CUSTOMERS),
      new CustomerActions.GetAll(),
      new CompanyActions.GetAll()
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch([
      new LayoutAction.ClearTitle(),
      new CustomerActions.ClearAll(),
      new CompanyActions.ClearAll()
    ]);
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
        this.store.dispatch(new CustomerActions.Delete(item.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          const result = response.customer.result;
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
          this.store.dispatch(new CustomerActions.DeleteAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.customer.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onToggleItem(id: number) {
    this.store.dispatch(new CustomerActions.ToggleItemSelection(id, TYPES.LIST));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new CustomerActions.ToggleAllItems(checked, TYPES.LIST));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new CustomerActions.Filter(filter, TYPES.LIST, columns));
  }
}
