import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { CompanyState } from './company.state';


describe('Company store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([CompanyState])]

    });

    store = TestBed.inject(Store);
  });
});
