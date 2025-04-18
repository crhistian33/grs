import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { CenterState } from './center.state';

describe('Center store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([CenterState])]

    });

    store = TestBed.inject(Store);
  });

});
