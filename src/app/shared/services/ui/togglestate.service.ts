import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleStateService {

  private _navState = signal<boolean>(false);
  private _isExpanded = signal<boolean>(false);
  private _filterData = signal<boolean>(false);

  public navState = this._navState.asReadonly();
  public isExpanded = this._isExpanded.asReadonly();
  public filterData = this._filterData.asReadonly();

  toggleNav() {
    this._navState.update(current => !current);
  }

  toggleExpanded() {
    this._isExpanded.update(current => !current);
  }

  setNavState(state: boolean) {
    this._navState.set(state);
  }

  setIsExpanded(expanded: boolean) {
    this._isExpanded.set(expanded);
  }

  setFilter(visible: boolean) {
    this._filterData.set(visible);
  }
}
