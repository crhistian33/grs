import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFormField } from '@shared/models/bases/form-fields.model';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-form-fields',
  imports: [CommonModule , ReactiveFormsModule, IftaLabelModule,  InputTextModule, InputNumberModule, SelectModule, TextareaModule, MultiSelectModule, DatePickerModule],
  templateUrl: './form-fields.component.html',
  styleUrl: './form-fields.component.scss'
})
export class FormFieldsComponent {
  @Input() myForm!: FormGroup;
  @Input() field!: IFormField;
  @Input() isInvalid: boolean = false;
  @Input() optionsSelect!: any;
  @Output() selectItem = new EventEmitter<any>();

  onSelectfield(event: any) {
    this.selectItem.emit(event);
  }
}
