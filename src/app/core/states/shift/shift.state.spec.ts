import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { ShiftState } from './shift.state';

describe('Shift store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([ShiftState])]

    });

    store = TestBed.inject(Store);
  });
});
