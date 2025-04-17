import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { CategoryState, CategoryStateModel } from './category.state';
import { CategoryAction } from './category.actions';

describe('Category store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([CategoryState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: CategoryStateModel = {
      items: ['item-1']
    };
    store.dispatch(new CategoryAction('item-1'));
    const actual = store.selectSnapshot(CategoryState.getState);
    expect(actual).toEqual(expected);
  });

});
