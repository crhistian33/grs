import { Component, inject, Input } from '@angular/core';
import { ToggleStateService } from '@shared/services/ui/togglestate.service';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-modal-form',
  imports: [Dialog],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent {
  private toggleStateService = inject(ToggleStateService);

  @Input() header: string = 'Modal Form';
  // visible = this.toggleStateService.modalOpen;

  // onHide(state: boolean) {
  //   this.toggleStateService.setModalOpen(state);
  // }
}
