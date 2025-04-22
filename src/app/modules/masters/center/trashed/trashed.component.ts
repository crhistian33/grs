import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ITableHeader } from '@shared/models/bases/table-headers.model';
import { Store } from '@ngxs/store';
import { ModalService } from '@shared/services/ui/modal.service';
import { ToastService } from '@shared/services/ui/toast.service';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { HeaderContentComponent } from '@shared/components/header-content/header-content.component';
import { ACTIONS, ICONS, MESSAGES, SEVERITIES, TITLES, TYPES } from '@shared/utils/constants';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Center } from '@models/masters/center.model';
import { CENTER_TABLE_HEADERS } from '@table-headers/center-headers';
import { CenterState } from '@states/center/center.state';
import { CenterActions } from '@states/center/center.actions';
import { LayoutAction } from '@shared/states/layout/layout.actions';

@Component({
  selector: 'app-trashed',
  imports: [CommonModule, HeaderContentComponent, DataTableComponent, ConfirmDialog, ButtonModule],
  templateUrl: './trashed.component.html',
  styleUrl: './trashed.component.scss'
})
export class TrashedComponent implements OnInit {
  private store = inject(Store);
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private destroy$ = new Subject<void>();

  title: string = TITLES.RECYCLE_CENTER;
  typePage: string = TYPES.RECYCLE;
  headers: ITableHeader<Center>[] = CENTER_TABLE_HEADERS;

  centers$: Observable<Center[]> = this.store.select(CenterState.getItemsTrashed);
  areAllSelected$: Observable<boolean> = this.store.select(CenterState.areTrashedAllSelected);
  hasSelectedItems$: Observable<boolean> = this.store.select(CenterState.hasTrashedSelectedItems);
  selectedItems$: Observable<Center[]> = this.store.select(CenterState.getTrashedSelectedItems);
  loading$: Observable<boolean> = this.store.select(CenterState.getLoading);

  ngOnInit(): void {
    this.store.dispatch([
      new LayoutAction.SetTitle('Centros'),
      new CenterActions.GetAllTrash
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

  onRestore(item: any) {
    this.modalService.onModalConfirm(
      TITLES.CONFIRM_RESTORE,
      MESSAGES.MESSAGE_RESTORE,
      ACTIONS.RESTORE,
      SEVERITIES.PRIMARY,
      ICONS.EXC_PRIMARY,
      () => {
      this.store.dispatch(new CenterActions.Restore(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.center.result;
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
      this.store.dispatch(new CenterActions.DeleteForce(item.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const result = response.center.result;
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
          this.store.dispatch(new CenterActions.RestoreAll(data))
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            const result = response.center.result;
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
          this.store.dispatch(new CenterActions.DeleteForceAll(data))
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
    this.store.dispatch(new CenterActions.ToggleItemSelection(id, TYPES.RECYCLE));
  }

  onToggleAll(checked: boolean) {
    this.store.dispatch(new CenterActions.ToggleAllItems(checked, TYPES.RECYCLE));
  }
}
