import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Center } from '@models/masters/center.model';
import { Company } from '@models/masters/company.model';
import { Customer } from '@models/masters/customer.model';
import { Shift } from '@models/masters/shift.model';
import { TypeWorker } from '@models/masters/typeworker.model';
import { Unit } from '@models/masters/unit.model';
import { Store } from '@ngxs/store';
import { FilterDefinition } from '@shared/models/bases/filters.model';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { ToggleStateService } from '@shared/services/ui/togglestate.service';
import { IDS } from '@shared/utils/constants';
import { CategoryState } from '@states/category/category.state';
import { CenterState } from '@states/center/center.state';
import { CompanyState } from '@states/company/company.state';
import { CustomerState } from '@states/customer/customer.state';
import { ShiftState } from '@states/shift/shift.state';
import { TypeWorkerState } from '@states/typeworker/typeworker.state';
import { UnitState } from '@states/unit/unit.state';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, DrawerModule, ButtonModule, IftaLabelModule, InputTextModule, ReactiveFormsModule, SelectModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  private store = inject(Store);
  private toggleStateService = inject(ToggleStateService);
  private fb = inject(FormBuilder);

  @Output() filters = new EventEmitter<FilterStateModel>();
  @Input() filterItems!: FilterDefinition[];
  visible = this.toggleStateService.filterData;
  filterForm!: FormGroup;

  companies$: Observable<Company[]> = this.store.select(CompanyState.getOptions);
  customers$: Observable<Customer[]> = this.store.select(CustomerState.getOptions);
  units$: Observable<Unit[]> = this.store.select(UnitState.getOptions);
  typeworkers$: Observable<TypeWorker[]> = this.store.select(TypeWorkerState.getOptions);
  centers$: Observable<Center[]> = this.store.select(CenterState.getOptions);
  shifts$: Observable<Shift[]> = this.store.select(ShiftState.getOptions);

  ngOnInit(): void {
    this.createFilterForm();
  }

  createFilterForm() {
    const filterFormConfig: {[key: string]: any} = {};

    this.filterItems.forEach(field => {
      filterFormConfig[field.key] = [null];
    });

    this.filterForm = this.fb.group(filterFormConfig);
  }

  onHide() {
    this.toggleStateService.setFilter(false);
  }

  onSubmit() {
    this.toggleStateService.setFilter(false);
    this.filters.emit(this.filterForm.value);
  }

  submitForm() {
    this.onSubmit();
  }

  clearForm() {
    this.filterForm.reset();
    this.filters.emit(this.filterForm.value);
    this.toggleStateService.setFilter(false);
  }

  getOptionsSelect(id: string): Observable<any> {
    switch(id) {
      case IDS.COMPANY:
        return this.companies$;
      case IDS.CUSTOMER:
        return this.customers$;
      case IDS.CENTER:
        return this.centers$;
      case IDS.TYPEWORKER:
        return this.typeworkers$;
      case IDS.UNIT:
        return this.units$;
      case IDS.SHIFT:
        return this.shifts$;
      default:
        return of([]);
    }
  }
}
