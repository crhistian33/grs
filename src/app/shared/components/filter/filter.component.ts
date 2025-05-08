import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Center } from '@models/masters/center.model';
import { Company } from '@models/masters/company.model';
import { Customer } from '@models/masters/customer.model';
import { Shift } from '@models/masters/shift.model';
import { TypeWorker } from '@models/masters/typeworker.model';
import { Unit } from '@models/masters/unit.model';
import { Roles, UserRole } from '@models/masters/user.model';
import { Store } from '@ngxs/store';
import { HasRoleDirective } from '@shared/directives/has-role.directive';
import { FilterDefinition } from '@shared/models/bases/filters.model';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { ToggleStateService } from '@shared/services/ui/togglestate.service';
import { IDS } from '@shared/utils/constants';
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
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, DrawerModule, ButtonModule, IftaLabelModule, InputTextModule, ReactiveFormsModule, SelectModule, HasRoleDirective],
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
  Roles = Roles;

  private allCompanies$ = this.store.select(CompanyState.getOptions);
  private allCustomers$ = this.store.select(CustomerState.getOptions);
  private allUnits$ = this.store.select(UnitState.getOptions);
  private allTypeworkers$ = this.store.select(TypeWorkerState.getOptions);
  private allCenters$ = this.store.select(CenterState.getOptions);
  private allShifts$ = this.store.select(ShiftState.getOptions);

  companies$: Observable<Company[]> = this.allCompanies$;
  customers$: Observable<Customer[]> = this.allCustomers$;
  units$: Observable<Unit[]> = this.allUnits$;
  typeworkers$: Observable<TypeWorker[]> = this.allTypeworkers$;
  centers$: Observable<Center[]> = this.allCenters$;
  shifts$: Observable<Shift[]> = this.allShifts$;

  ngOnInit(): void {
    this.createFilterForm();
    this.dependeciesFilter();
  }

  createFilterForm() {
    const filterFormConfig: {[key: string]: any} = {};

    this.filterItems.forEach(field => {
      filterFormConfig[field.key] = [null];
    });

    this.filterForm = this.fb.group(filterFormConfig);
  }

  dependeciesFilter() {
    this.filterItems.forEach(field => {
      if(field.dependsOn && this.filterForm.get(field.dependsOn)) {
        this.filterForm.get(field.dependsOn)?.valueChanges.subscribe(value => {
          this.filterForm.get(field.key)?.setValue(null);
          if(value)
            this.filterDependencies(field.key, value);
          else
            this.resetFilter(field.key);
        });
      }
    });
  }

  filterDependencies(childKey?: string, value?: number) {
    switch(childKey) {
      case IDS.CUSTOMER:
        this.customers$ = this.allCustomers$.pipe(
          map(customers => customers.filter(customer => customer.company.id === value))
        );
        break;
      case IDS.UNIT:
        this.units$ = this.allUnits$.pipe(
          map(units => units.filter(unit => unit.customer.id === value))
        );
        break;
    }
  }

  resetFilter(childKey: string) {
    switch(childKey) {
      case IDS.CUSTOMER:
        this.customers$ = this.allCustomers$;
        break;
      case IDS.UNIT:
        this.units$ = this.allUnits$;
        break;
    }
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

  getOptionsSelect(id: string, roles: UserRole[]): Observable<any> {
    switch(id) {
      case IDS.COMPANY:
        return roles.includes(Roles.ADMIN) ? this.companies$ : of([]);
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
