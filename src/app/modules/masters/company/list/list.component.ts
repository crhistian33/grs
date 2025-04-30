import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';

import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

import { HeaderContentComponent } from '@shared/components/header-content/header-content.component';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { FormComponent } from '../form/form.component';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { ModalService } from '@shared/services/ui/modal.service';
import { ToastService } from '@shared/services/ui/toast.service';
import { ITableHeader } from '@shared/models/bases/table-headers.model';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { ACTIONS, ICONS, IDS, MESSAGES, SEVERITIES, TITLES, TYPES } from '@shared/utils/constants';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { COMPANY_TABLE_HEADERS } from '@table-headers/company-headers';
import { Company } from '@models/masters/company.model';
import { CompanyState } from '@states/company/company.state';
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

  headers: ITableHeader<Company>[] = COMPANY_TABLE_HEADERS;
  title: string = TITLES.LIST;
  typePage: string = TYPES.LIST;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.COMPANY));

  companies$: Observable<Company[]> = this.store.select(CompanyState.getItems);
  areAllSelected$: Observable<boolean> = this.store.select(CompanyState.areAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(CompanyState.hasSelectedItems);
  selectedItems$: Observable<Company[]> = this.store.select(CompanyState.getSelectedItems);
  loading$: Observable<boolean> = this.store.select(CompanyState.getLoading);
  trashes$: Observable<number> = this.store.select(CompanyState.getTrashes);

  ngOnInit(): void {
    this.store.dispatch(new LayoutAction.SetTitle(TITLES.COMPANIES));
    this.store.dispatch(new CompanyActions.GetAll());
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
        this.store.dispatch(new CompanyActions.Delete(item.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          const result = response.company.result;
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
          this.store.dispatch(new CompanyActions.DeleteAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.company.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onToggleItem(id: number) {
    this.store.dispatch(new CompanyActions.ToggleItemSelection(id, TYPES.LIST));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new CompanyActions.ToggleAllItems(checked, TYPES.LIST));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new CompanyActions.Filter(filter, TYPES.LIST, columns));
  }
}
