import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { InputNumberModule } from 'primeng/inputnumber';

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
import { FormFieldsComponent } from '../form-fields/form-fields.component';

@Component({
  selector: 'app-form-builder',
  imports: [CommonModule, IftaLabelModule, InputTextModule, SelectModule, TextareaModule, ButtonModule, ReactiveFormsModule, ToastModule, MultiSelectModule, DatePickerModule, InputNumberModule, FormFieldsComponent],
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

  @Input() formFields: IFormField[] = [];
  @Output() formData = new EventEmitter<RequestFormData>();
  myForm!: FormGroup;
  entityID!: number;

  companies$: Observable<Company[]> = this.store.select(CompanyState.getOptions);
  customers$: Observable<Customer[]> = this.store.select(CustomerState.getOptions);
  centers$: Observable<Center[]> = this.store.select(CenterState.getOptions);
  shifts$: Observable<Shift[]> = this.store.select(ShiftState.getOptions);
  typeworkers$: Observable<TypeWorker[]> = this.store.select(TypeWorkerState.getOptions);

  ngOnInit() {
    this.createFormGroup();
  }

  private createFormGroup() {
    const formGroupConfig: {[key: string]: any} = {};

    this.formFields.forEach(field => {
      if(field.type === 'group' && field.options) {
        const groupConfig: {[key: string]: any} = {};

        field.options?.forEach(subField => {
          const initialValue = subField.defaultValue ? subField.defaultValue : null;

          groupConfig[subField.key] = [
            initialValue,
            this.buildValidators(subField)
          ];
        });
        formGroupConfig[field.key] = this.fb.group(groupConfig);
      } else {
        const value = field.defaultValue ? field.defaultValue : null;
        const validators = this.buildValidators(field);
        formGroupConfig[field.key] = [value, validators];
      }
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
          case 'contract':
            this.myForm.get(controlName)?.setValue({
              start_date: data['start_date'],
              end_date: data['end_date'],
              type_worker_id: data['typeworker'].id,
            });
            break;
          default:
            this.myForm.get(controlName)?.setValue(data[controlName]);
            break;
        }
      });
    }
  }

  // Obtener un FormGroup anidado por su nombre
  getGroupForm(groupName: string): FormGroup {
    return this.myForm.get(groupName) as FormGroup;
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
    if (this.myForm.valid) {
      const formData = {...this.myForm.value };
      this.formatDatesInFormData(formData);

      if(close) {
        this.entityID
          ? this.formData.emit({ data: formData, close, id: this.entityID })
          : this.formData.emit({ data: formData, close });
      } else {
        this.entityID
          ? this.formData.emit({ data: formData, close, id: this.entityID, onReset: () => this.onResetForm() })
          : this.formData.emit({ data: formData, close, onReset: () => this.onResetForm() });
      }
    } else {
      this.myForm.markAllAsTouched();
      this.showMessageInvalid();
    }
  }

  formatDatesInFormData(formData: any) {
    Object.keys(formData).forEach(key => {
      const value = formData[key];

      if (key.endsWith('_date') && typeof value === 'string') {
        formData[key] = value.split("/").reverse().join("-");
      }
      else if (typeof value === 'object' && value !== null) {
        this.formatDatesInFormData(value);
      }
    });
    return formData;
  }

  onCancel() {
    this.modalService.onModalClose();
  }

  onResetForm() {
    this.myForm.reset();
  }

  isInvalid(fieldName: string, subFieldName?: string): boolean {
    const control = this.myForm.get(fieldName);

    if(control instanceof FormGroup && subFieldName){
      const group = control as FormGroup;
      if (!group) return false;

      const subControl = group.get(subFieldName);
      return subControl ? subControl.invalid && (subControl.dirty || subControl.touched) : false;
    }
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  showMessageInvalid() {
    this.toastService.clear();
    const errorMessages = this.getValidationErrors(this.myForm);

    if (errorMessages.length > 0) {
      this.toastService.notification('Errores de validación', errorMessages.join('\n'), 'error', 4000);
    }
  }

  private getValidationErrors(control: AbstractControl, path = ''): string[] {
    const errors: string[] = [];

    if (control.errors && Object.keys(control.errors).length > 0) {
      let fieldConfig: IFormField | undefined;

      if (path.includes('.')) {
        const [groupKey, fieldKey] = path.split('.');
        const groupConfig = this.formFields.find(f => f.key === groupKey && f.type === 'group');
        fieldConfig = groupConfig?.options?.find(f => f.key === fieldKey);
      } else {
        fieldConfig = this.formFields.find(field => field.key === path);
      }

      if (fieldConfig?.validators) {
        const controlErrors = Object.keys(control.errors);
        fieldConfig.validators
          .filter(validator => validator.name && controlErrors.includes(validator.name))
          .forEach(validator => errors.push(validator.message));
      }
    }

    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key => {
        const childPath = path ? `${path}.${key}` : key;
        errors.push(...this.getValidationErrors(control.get(key)!, childPath));
      });
    } else if (control instanceof FormArray) {
      control.controls.forEach((ctrl, index) => {
        const childPath = path ? `${path}[${index}]` : `${index}`;
        errors.push(...this.getValidationErrors(ctrl, childPath));
      });
    }

    return errors;
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

  onSelectItem(event: any, item: any) {
    const { key, prevcode } = item;
    if(prevcode) {
      let getState;
      if(key === 'company_id') {
        getState = CompanyState.getOptions;
      }
      if(key === 'customer_id') {
        getState = CustomerState.getOptions;
      }
      if(getState) {
        const items = this.store.selectSnapshot(getState);
        const item = items.find(el => el.id === event.value);
        this.myForm.get(prevcode)?.setValue(item?.code + '-');
      }
    }
  }
}
