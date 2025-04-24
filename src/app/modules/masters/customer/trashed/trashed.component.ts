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
import { Customer } from '@models/masters/customer.model';
import { CUSTOMER_TABLE_HEADERS } from '@table-headers/customer-headers';
import { CustomerState } from '@states/customer/customer.state';
import { CustomerActions } from '@states/customer/customer.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { APP_FILTERS } from 'src/app/core/definitions/filters';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { CompanyActions } from '@states/company/company.actions';

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
  headers: ITableHeader<Customer>[] = CUSTOMER_TABLE_HEADERS;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.CUSTOMER));

  customers$: Observable<Customer[]> = this.store.select(CustomerState.getItemsTrashed);
  areAllSelected$: Observable<boolean> = this.store.select(CustomerState.areTrashedAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(CustomerState.hasTrashedSelectedItems);
  selectedItems$: Observable<Customer[]> = this.store.select(CustomerState.getTrashedSelectedItems);
  loading$: Observable<boolean> = this.store.select(CustomerState.getLoading);

  ngOnInit(): void {
    this.store.dispatch([
      new LayoutAction.SetTitle(TITLES.CUSTOMERS),
      new CustomerActions.GetAllTrash(),
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

  onRestore(item: any) {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_RESTORE,
      MESSAGES.MESSAGE_RESTORE,
      ACTIONS.RESTORE,
      SEVERITIES.PRIMARY,
      ICONS.EXC_PRIMARY,
      () => {
      this.store.dispatch(new CustomerActions.Restore(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.customer.result;
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
      this.store.dispatch(new CustomerActions.DeleteForce(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.customer.result;
        this.toastService.notification(result.title, result.message, 'success', 4000);
      });
    });
  }

  onRestoreAll() {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_RESTORE_ALL,
      MESSAGES.MESSAGE_RESTORE_ALL,
      ACTIONS.RESTORE,
      SEVERITIES.PRIMARY,
      ICONS.EXC_PRIMARY,
      () => {
        this.selectedItems$.pipe(take(1)).subscribe((data) => {
          this.store.dispatch(new CustomerActions.RestoreAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.customer.result;
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
          this.store.dispatch(new CustomerActions.DeleteForceAll(data))
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
    this.store.dispatch(new CustomerActions.ToggleItemSelection(id, TYPES.RECYCLE));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new CustomerActions.ToggleAllItems(checked, TYPES.RECYCLE));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new CustomerActions.Filter(filter, TYPES.RECYCLE, columns));
  }
}
