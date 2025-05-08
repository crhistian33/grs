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
import { Unit } from '@models/masters/unit.model';
import { UNIT_TABLE_HEADERS } from '@table-headers/unit-headers';
import { UnitState } from '@states/unit/unit.state';
import { UnitActions } from '@states/unit/unit.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { APP_FILTERS } from 'src/app/core/definitions/filters';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { CompanyActions } from '@states/company/company.actions';
import { CustomerActions } from '@states/customer/customer.actions';
import { CenterActions } from '@states/center/center.actions';
import { ShiftActions } from '@states/shift/shift.actions';
import { ActionService } from '@shared/services/ui/action.service';
import { AuthState } from '@states/auth/auth.state';
import { Roles } from '@models/masters/user.model';

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
  headers: ITableHeader<Unit>[] = UNIT_TABLE_HEADERS;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.UNIT));
  Roles = Roles;

  units$: Observable<Unit[]> = this.store.select(UnitState.getItemsTrashed);
  areAllSelected$: Observable<boolean> = this.store.select(UnitState.areTrashedAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(UnitState.hasTrashedSelectedItems);
  selectedItems$: Observable<Unit[]> = this.store.select(UnitState.getTrashedSelectedItems);
  loading$: Observable<boolean> = this.store.select(UnitState.getLoading);

  ngOnInit(): void {
    const rol = this.store.selectSnapshot(AuthState.getUserProfile)?.role.name;
    let actions = [
      new LayoutAction.SetTitle(TITLES.UNITS),
      new UnitActions.GetAllTrash(),
      new CustomerActions.GetOptions(),
      new CenterActions.GetOptions(),
      new ShiftActions.GetOptions()
    ];

    if(rol === Roles.ADMIN)
      actions.push(new CompanyActions.GetOptions());

    this.actionService.execActions(actions);
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
      this.store.dispatch(new UnitActions.Restore(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.unit.result;
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
      this.store.dispatch(new UnitActions.DeleteForce(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.unit.result;
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
          this.store.dispatch(new UnitActions.RestoreAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.unit.result;
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
          this.store.dispatch(new UnitActions.DeleteForceAll(data))
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
    this.store.dispatch(new UnitActions.ToggleItemSelection(id, TYPES.RECYCLE));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new UnitActions.ToggleAllItems(checked, TYPES.RECYCLE));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new UnitActions.Filter(filter, TYPES.RECYCLE, columns));
  }
}
