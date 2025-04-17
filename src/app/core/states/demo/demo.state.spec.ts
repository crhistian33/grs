import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { DemoState } from './demo.state';
import { DemoActions } from './demo.actions';
import { BaseStateModel } from '@shared/models/bases/basestate-model';
import { Demo } from '@models/masters/demo.model';

describe('Demo store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([DemoState])]

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
