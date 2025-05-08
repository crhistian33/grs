import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Roles } from '@models/masters/user.model';
import { Store } from '@ngxs/store';
import { HasRoleDirective } from '@shared/directives/has-role.directive';
import { LayoutAction } from '@shared/states/layout/layout.actions';


@Component({
  selector: 'app-home',
  imports: [RouterLink, HasRoleDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  Roles = Roles;

  ngOnInit(): void {
    this.store.dispatch(new LayoutAction.SetTitle('Maestros'));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new LayoutAction.ClearTitle);
  }
}
