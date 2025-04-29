import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeWorker } from '@models/masters/typeworker.model';
import { Worker } from '@models/masters/worker.model';
import { Store } from '@ngxs/store';
import { ModalService } from '@shared/services/ui/modal.service';
import { ToastService } from '@shared/services/ui/toast.service';
import { TypeWorkerState } from '@states/typeworker/typeworker.state';
import { WorkerActions } from '@states/worker/worker.actions';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-renew',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, IftaLabelModule, DatePickerModule, SelectModule],
  templateUrl: './renew.component.html',
  styleUrl: './renew.component.scss'
})
export class RenewComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly modalService = inject(ModalService);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();
  public config = inject(DynamicDialogConfig);

  worker!: Worker;
  myForm!: FormGroup;

  typeworkers$: Observable<TypeWorker[]> = this.store.select(TypeWorkerState.getItems);

  ngOnInit(): void {
    this.worker = this.config.data.item;
    this.myForm = this.fb.group({
      contract: this.fb.group({
        start_date: [null, Validators.required],
        end_date: [null, Validators.required],
        type_worker_id: [null, Validators.required],
      })
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if(this.myForm.valid) {
      this.store.dispatch(new WorkerActions.Renew(this.worker.id, this.myForm.value))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.modalService.onModalClose();
        const result = response.worker.result;
        this.toastService.notification(result.title, result.message, 'success', 4000);
      });
    } else {
      this.myForm.markAllAsTouched();
      this.showMessagesInvalid();
    }
  }

  showMessagesInvalid() {
    const errors: string[] = [];

    if(this.myForm.get('start_date')?.hasError('required'))
      errors.push('La fecha de inicio es requerida');
    if(this.myForm.get('end_date')?.hasError('required'))
      errors.push('La fecha de cese es requerida');
    if(this.myForm.get('type_worker_id')?.hasError('required'))
      errors.push('El tipo de trabajador es requerido');

    if (errors.length > 0) {
      this.toastService.notification('Errores de validación', errors.join('\n'), 'error', 3000);
    }
  }

  isInvalid(fieldName: string): boolean {
    const control = this.myForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onCancel() {
    this.modalService.onModalClose();
  }
}
