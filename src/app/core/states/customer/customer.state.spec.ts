import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { CustomerState } from './customer.state';

describe('Customer store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([CustomerState])]

    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    // const expected: BaseStateModel<Demo> = {
    //   entities: []
    // };
    // store.dispatch(new DemoActions.GetAll('item-1'));
    // const actual = store.selectSnapshot(DemoState.getState);
    // expect(actual).toEqual(expected);
  });

});
