import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private confirmationService = inject(ConfirmationService);
  public dialogService = inject(DialogService);

  ref: DynamicDialogRef | undefined;

  onModalForm(form: any, header: string, item?: any) {
    this.ref = this.dialogService.open(form, {
      header: header,
      contentStyle: { overflow: 'auto' },
      closable: true,
      maximizable: true,
      width: '50vw',
      modal:true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: {
        item: item
      },
    });
  }

  onModalConfirm(header: string, message: string, action: string, severity: string, icon: string, onAccept: () => void) {
    this.confirmationService.confirm({
      header,
      message,
      icon,
      rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary'
      },
      acceptButtonProps: {
          label: action,
          severity,
      },
      accept: () => {
          onAccept();
      }
    });
  }

  onModalClose() {
    this.ref?.close();
  }
}
