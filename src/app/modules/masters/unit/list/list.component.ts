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
import { UNIT_TABLE_HEADERS } from '@table-headers/unit-headers';
import { Unit } from '@models/masters/unit.model';
import { UnitState } from '@states/unit/unit.state';
import { UnitActions } from '@states/unit/unit.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { CompanyActions } from '@states/company/company.actions';
import { ShiftActions } from '@states/shift/shift.actions';
import { CustomerActions } from '@states/customer/customer.actions';
import { CenterActions } from '@states/center/center.actions';
import { APP_FILTERS } from 'src/app/core/definitions/filters';
import { ActionService } from '@shared/services/ui/action.service';

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

  headers: ITableHeader<Unit>[] = UNIT_TABLE_HEADERS;
  title: string = TITLES.LIST;
  typePage: string = TYPES.LIST;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.UNIT));

  units$: Observable<Unit[]> = this.store.select(UnitState.getItems);
  areAllSelected$: Observable<boolean> = this.store.select(UnitState.areAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(UnitState.hasSelectedItems);
  selectedItems$: Observable<Unit[]> = this.store.select(UnitState.getSelectedItems);
  loading$: Observable<boolean> = this.store.select(UnitState.getLoading);
  trashes$: Observable<number> = this.store.select(UnitState.getTrashes);

  ngOnInit(): void {
    this.actionService.execActions([
      new LayoutAction.SetTitle(TITLES.UNITS),
      new UnitActions.GetAll(),
      new CompanyActions.GetOptions(),
      new CustomerActions.GetOptions(),
      new CenterActions.GetOptions(),
      new ShiftActions.GetOptions()
    ]);
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
        this.store.dispatch(new UnitActions.Delete(item.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          const result = response.unit.result;
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
          this.store.dispatch(new UnitActions.DeleteAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.unit.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onToggleItem(id: number) {
    this.store.dispatch(new UnitActions.ToggleItemSelection(id, TYPES.LIST));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new UnitActions.ToggleAllItems(checked, TYPES.LIST));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new UnitActions.Filter(filter, TYPES.LIST, columns));
  }
}
