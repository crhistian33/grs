import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutState } from '@shared/states/layout/layout.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-page',
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss'
})
export class HeaderPageComponent {
  private store = inject(Store);

  title$: Observable<string> = this.store.select(LayoutState.getTitle);
}
