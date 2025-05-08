import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { FormatDataPipe } from '@shared/pipes/format-data.pipe';
import { TYPES } from '@shared/utils/constants';
import { IconFieldModule } from 'primeng/iconfield';
import { HasRoleDirective } from '@shared/directives/has-role.directive';
import { Roles } from '@models/masters/user.model';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, TableModule, ButtonModule, CheckboxModule, Tooltip, SkeletonModule, FormatDataPipe, IconFieldModule, HasRoleDirective],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataTableComponent {
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() restore = new EventEmitter<any>();
  @Output() renew = new EventEmitter<any>();
  @Output() toggleItem = new EventEmitter<number>();
  @Output() toggleAll = new EventEmitter<boolean>();
  @Input() items: any;
  @Input() headers: any;
  @Input() typePage: string = '';
  @Input() areAllSelected: boolean = false;
  @Input() selectedItems: any;
  @Input() loading: boolean = false;

  types = TYPES;
  Roles = Roles;

  onUpdate(item: any) {
    this.update.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  onRestore(item: any) {
    this.restore.emit(item);
  }

  onRenew(item: any) {
    this.renew.emit(item);
  }

  onToggleItem(id: number) {
    this.toggleItem.emit(id);
  }

  onToggleAll(event: any) {
    const isChecked = event.checked;
    this.toggleAll.emit(isChecked);
  }
}
