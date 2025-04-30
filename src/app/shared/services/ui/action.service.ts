import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private store = inject(Store);

  execActions(actions: any[]): void {
    forkJoin(
      actions.map(action => this.store.dispatch(action))
    ).subscribe();
  }
}
