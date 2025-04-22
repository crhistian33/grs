import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { LayoutState, LayoutStateModel } from './layout.state';
import { LayoutAction } from './layout.actions';

describe('Layout store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([LayoutState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: LayoutStateModel = {
      items: ['item-1']
    };
    store.dispatch(new LayoutAction('item-1'));
    const actual = store.selectSnapshot(LayoutState.getState);
    expect(actual).toEqual(expected);
  });

});
