import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { BreadcrumbService } from '@shared/services/ui/breadcrumb.service';
import { BreadcrumbState } from '@shared/states/breadcrumb/breadcrumb.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, Breadcrumb, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  private store = inject(Store);
  private breadcrumbService = inject(BreadcrumbService);

  items$: Observable<MenuItem[]> = this.store.select(BreadcrumbState.getBreadcrumbs);

  home!: MenuItem;

  ngOnInit(): void {
    this.home = {
      icon: 'pi pi-home text-primary',
      routerLink: '/inicio',
    };
  }
}
