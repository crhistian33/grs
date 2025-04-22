import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { LayoutAction } from '@shared/states/layout/layout.actions';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(new LayoutAction.SetTitle('Maestros'));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new LayoutAction.ClearTitle);
  }
}
