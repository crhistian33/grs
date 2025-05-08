import { Location } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Roles } from '@models/masters/user.model';
import { HasRoleDirective } from '@shared/directives/has-role.directive';
import { ToggleStateService } from '@shared/services/ui/togglestate.service';
import { TYPES } from '@shared/utils/constants';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header-content',
  imports: [ButtonModule, RouterLink, HasRoleDirective],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.scss',
})
export class HeaderContentComponent {
  private toggleStateService = inject(ToggleStateService);
  private location = inject(Location);
  private router = inject(Router);

  @Output() create = new EventEmitter<void>();
  @Output() restoreAll = new EventEmitter<void>();
  @Output() deleteAll = new EventEmitter<void>();
  @Output() filter = new EventEmitter<void>();
  @Input() title: string = '';
  @Input() typePage: string = '';
  @Input() hasSelectedItem: boolean = false;
  @Input() trashes: number = 0;

  types = TYPES;
  Roles = Roles;
  fallbackUrl = '/';

  onOpenCreate() {
    this.create.emit();
  }

  onRestoreAll() {
    this.restoreAll.emit();
  }

  onDeleteAll() {
    this.deleteAll.emit();
  }

  onFilter() {
    this.toggleStateService.setFilter(true);
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate([this.fallbackUrl]);
    }
  }
}
