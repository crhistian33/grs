import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '@models/masters/category.model';
import { Store } from '@ngxs/store';
import { FilterOptions, FilterStateModel } from '@shared/models/ui/filter.model';
import { ToggleStateService } from '@shared/services/ui/togglestate.service';
import { CategoryState } from '@states/category/category.state';
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
export class FilterComponent {
  private store = inject(Store);
  private toggleStateService = inject(ToggleStateService);
  private fb = inject(FormBuilder);

  @Output() filters = new EventEmitter<FilterStateModel>();
  @Input() fieldsFilter!: FilterOptions;
  visible = this.toggleStateService.filterData;
  filterForm: FormGroup;

  categories$: Observable<Category[]> = this.store.select(CategoryState.getItems);

  constructor() {
    this.filterForm = this.fb.group({
      search: [null],
      categoryId: [null]
    });
  }

  onHide() {
    this.toggleStateService.setFilter(false);
  }

  onSubmit() {
    this.filters.emit(this.filterForm.value);
  }

  submitForm() {
    this.onSubmit();
    this.toggleStateService.setFilter(false);
  }

  clearForm() {
    this.filterForm.reset();
    this.filters.emit(this.filterForm.value);
    this.toggleStateService.setFilter(false);
  }

  getOptionsSelect(id: string): Observable<any> {
    switch(id) {
      case 'category':
        return this.categories$;
      default:
        return of([]);
    }
  }
}
