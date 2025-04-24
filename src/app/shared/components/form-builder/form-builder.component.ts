import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';

import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';

import { Company } from '@models/masters/company.model';
import { RequestFormData } from '@shared/models/bases/base-request.model';
import { IFormField } from '@shared/models/bases/form-fields.model';
import { ModalService } from '@shared/services/ui/modal.service';
import { ToastService } from '@shared/services/ui/toast.service';
import { CompanyState } from '@states/company/company.state';
import { Shift } from '@models/masters/shift.model';
import { ShiftState } from '@states/shift/shift.state';
import { Customer } from '@models/masters/customer.model';
import { CustomerState } from '@states/customer/customer.state';
import { CenterState } from '@states/center/center.state';
import { Center } from '@models/masters/center.model';
import { TypeWorker } from '@models/masters/typeworker.model';
import { TypeWorkerState } from '@states/typeworker/typeworker.state';

@Component({
  selector: 'app-form-builder',
  imports: [CommonModule, IftaLabelModule, InputTextModule, SelectModule, TextareaModule, ButtonModule, ReactiveFormsModule, ToastModule, MultiSelectModule, DatePickerModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnChanges {
  private store = inject(Store);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  public config = inject(DynamicDialogConfig);
  private datePipe = inject(DatePipe);

  @Input() formFields: IFormField[] = [];
  @Output() formData = new EventEmitter<RequestFormData>();
  myForm!: FormGroup;
  entityID!: number;

  companies$: Observable<Company[]> = this.store.select(CompanyState.getItems);
  customers$: Observable<Customer[]> = this.store.select(CustomerState.getItems);
  centers$: Observable<Center[]> = this.store.select(CenterState.getItems);
  shifts$: Observable<Shift[]> = this.store.select(ShiftState.getItems);
  typeworkers$: Observable<TypeWorker[]> = this.store.select(TypeWorkerState.getItems);

  ngOnInit() {
    this.createFormGroup();
  }

  private createFormGroup() {
    const formGroupConfig: {[key: string]: any} = {};

    this.formFields.forEach(field => {
      const validators = this.buildValidators(field);
      formGroupConfig[field.key] = [field.defaultValue, validators];
    });

    this.myForm = this.fb.group(formGroupConfig);

    if(this.config.data && this.config.data.item) {
      this.entityID = this.config.data.item.id;
      const data = this.config.data.item;

      Object.keys(this.myForm.controls).forEach(controlName => {
        switch (controlName) {
          case 'company_id':
            this.myForm.get(controlName)?.setValue(data['company'].id);
            break;
          case 'customer_id':
            this.myForm.get(controlName)?.setValue(data['customer'].id);
            break;
          case 'center_id':
            this.myForm.get(controlName)?.setValue(data['center'].id);
            break;
          case 'type_worker_id':
            this.myForm.get(controlName)?.setValue(data['typeworker'].id);
            break;
          default:
            this.myForm.get(controlName)?.setValue(data[controlName]);
            break;
        }
      });
    }
  }

  private buildValidators(field: any): any[] {
    if (!field.validators) return [];

    return field.validators.map((validation: any) => {
      switch (validation.value) {
        case 'required': return Validators.required;
        case 'maxLength(20)': return Validators.maxLength(20);
        case 'pattern(8)': return Validators.pattern('^[0-9]{8}$');
        case 'pattern(11)': return Validators.pattern('^[0-9]{11}$');
        case 'pattern(9)': return Validators.pattern('^[0-9]{1,9}$');
        default: return null;
      }
    }).filter(Boolean);
  }

  onSubmit(close: boolean) {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      if(close) {
        this.entityID
          ? this.formData.emit({ data: this.myForm.value, close, id: this.entityID })
          : this.formData.emit({ data: this.myForm.value, close });
      } else {
        this.entityID
          ? this.formData.emit({ data: this.myForm.value, close, id: this.entityID, onReset: () => this.onResetForm() })
          : this.formData.emit({ data: this.myForm.value, close, onReset: () => this.onResetForm() });
      }
    } else {
      this.myForm.markAllAsTouched();
      this.showMessageInvalid();
    }
  }

  onCancel() {
    this.modalService.onModalClose();
  }

  onResetForm() {
    this.myForm.reset();
  }

  isInvalid(fieldName: string): boolean {
    const control = this.myForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  showMessageInvalid() {
    const controls = this.myForm.controls;
    this.toastService.clear();

    const errorMessages: string[] = [];

    Object.keys(controls).forEach(controlName => {
      const control = this.myForm.get(controlName);

      if (control?.invalid && control.errors) {
        const fieldConfig  = this.formFields.find(field => field.key === controlName);

        if (fieldConfig?.validators) {
          const errors = Object.keys(control.errors);

          fieldConfig.validators.forEach(validator => {
            if (validator.name && errors.includes(validator.name)) {
              errorMessages.push(validator.message);
            }
          });
        }
      }
    });

    if(errorMessages.length > 0) {
      const messagesContent = errorMessages.join('\n');
      this.toastService.notification('Errores de validación', messagesContent, 'error', 4000);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetForm']?.currentValue && this.myForm) {
      this.onResetForm();
    }
  }

  getOptionsSelect(id: string): Observable<any> {
    switch(id) {
      case 'company_id':
        return this.companies$;
      case 'customer_id':
        return this.customers$;
      case 'center_id':
        return this.centers$;
      case 'type_worker_id':
        return this.typeworkers$;
      case 'shifts':
        return this.shifts$;
      default:
        return of([]);
    }
  }

  onDateSelect(date: Date, controlName: string) {
    this.myForm.get(controlName)?.setValue(
      date.toISOString().split('T')[0],
      { emitEvent: false }
    );
  }

  getDisplayDate(controlName: string) {
    const apiDate = this.myForm.get(controlName)?.value;
    if (!apiDate) return '';

    // Convertir de yy-mm-dd a Date object
    const parts = apiDate.split('-');
    const date = new Date(2000 + parseInt(parts[0]), parts[1] - 1, parts[2]);

    // Formatear para mostrar (dd/mm/yy)
    return this.datePipe.transform(date, 'dd/MM/yy') || '';
  }
}
