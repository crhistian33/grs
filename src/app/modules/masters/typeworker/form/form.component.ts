import { Component, inject, OnDestroy } from '@angular/core';
import { IFormField } from '@shared/models/bases/form-fields.model';
import { FormBuilderComponent } from '@shared/components/form-builder/form-builder.component';
import { RequestFormData } from '@shared/models/bases/base-request.model';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '@shared/services/ui/modal.service';
import { ToastService } from '@shared/services/ui/toast.service';
import { TYPEWORKER_FORM_FIELDS } from '@form-fields/typeworker-fields';
import { TypeWorkerActions } from '@states/typeworker/typeworker.actions';

@Component({
  selector: 'app-form',
  imports: [FormBuilderComponent],
templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnDestroy {
  private store = inject(Store);
  private toastService = inject(ToastService);
  private modalService = inject(ModalService);
  private destroy$ = new Subject<void>();

  formFields: IFormField[] = TYPEWORKER_FORM_FIELDS;

  submitFormData(formData: RequestFormData) {
    const { id, data, close, onReset } = formData;

    const action = id
    ? new TypeWorkerActions.Update(id, data)
    : new TypeWorkerActions.Create(data);

    this.store.dispatch(action)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      if(close) {
        this.modalService.onModalClose();
      } else {
        if(onReset)
          onReset();
      }
      const result = response.typeWorker.result;
      this.toastService.notification(result.title, result.message, 'success', 4000);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
