import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messageService = inject(MessageService);

  notification(summary: string, detail: string, severity: string, life: number = 3000) {
    this.messageService.add({ severity, summary, detail, life});
  }

  clear() {
    this.messageService.clear();
  }
}
