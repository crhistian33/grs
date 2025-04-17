import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IFormField } from '@shared/models/bases/form-fields.model';
import { FormBuilderComponent } from '@shared/components/form-builder/form-builder.component';
import { DEMO_FORM_FIELDS } from '@form-fields/demo-fields';
import { RequestFormData } from '@shared/models/bases/base-request.model';
import { DemoActions } from '@states/demo/demo.actions';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '@shared/services/ui/modal.service';
import { ToastService } from '@shared/services/ui/toast.service';
import { CategoryActions } from '@states/category/category.actions';

@Component({
  selector: 'app-form',
  imports: [FormBuilderComponent],
templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private toastService = inject(ToastService);
  private modalService = inject(ModalService);
  private destroy$ = new Subject<void>();

  formFields: IFormField[] = DEMO_FORM_FIELDS;

  ngOnInit(): void {
    this.store.dispatch(CategoryActions.GetAll);
  }

  submitFormData(formData: RequestFormData) {
    const { id, data, close, onReset } = formData;
    console.log(data, id);
    const action = id
    ? new DemoActions.Update(id, data)
    : new DemoActions.Create(data);

    this.store.dispatch(action)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      if(close) {
        this.modalService.onModalClose();
      } else {
        if(onReset)
          onReset();
      }
      const result = response.demo.result;
      this.toastService.notification(result.title, result.message, 'success', 4000);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
