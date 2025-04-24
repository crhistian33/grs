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
import { Shift } from '@models/masters/shift.model';
import { SHIFT_TABLE_HEADERS } from '@table-headers/shift-headers';
import { ShiftState } from '@states/shift/shift.state';
import { ShiftActions } from '@states/shift/shift.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';
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
  headers: ITableHeader<Shift>[] = SHIFT_TABLE_HEADERS;
  filters = APP_FILTERS.filter(filter => filter.modules.includes(IDS.SHIFT));

  shifts$: Observable<Shift[]> = this.store.select(ShiftState.getItemsTrashed);
  areAllSelected$: Observable<boolean> = this.store.select(ShiftState.areTrashedAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(ShiftState.hasTrashedSelectedItems);
  selectedItems$: Observable<Shift[]> = this.store.select(ShiftState.getTrashedSelectedItems);
  loading$: Observable<boolean> = this.store.select(ShiftState.getLoading);

  ngOnInit(): void {
    this.store.dispatch([
      new LayoutAction.SetTitle(TITLES.SHIFTS),
      new ShiftActions.GetAllTrash()
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch([
      new LayoutAction.ClearTitle(),
      new ShiftActions.ClearAll()
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
      this.store.dispatch(new ShiftActions.Restore(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.shift.result;
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
      this.store.dispatch(new ShiftActions.DeleteForce(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.shift.result;
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
          this.store.dispatch(new ShiftActions.RestoreAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.shift.result;
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
          this.store.dispatch(new ShiftActions.DeleteForceAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.shift.result;
            this.toastService.notification(result.title, result.message, 'success', 4000);
          });
        });
      }
    );
  }

  onToggleItem(id: number) {
    this.store.dispatch(new ShiftActions.ToggleItemSelection(id, TYPES.RECYCLE));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new ShiftActions.ToggleAllItems(checked, TYPES.RECYCLE));
  }

  onFilterData(filter: FilterStateModel) {
    const columns: string[] = this.headers.filter(column => column.filtered).map(column => column.key);
    this.store.dispatch(new ShiftActions.Filter(filter, TYPES.RECYCLE, columns));
  }
}
