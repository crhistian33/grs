import { TestBed } from '@angular/core/testing';
import { provideStore,  Store } from '@ngxs/store';
import { TypeWorkerState } from './typeworker.state';

describe('Demo store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([TypeWorkerState])]

    });

    store = TestBed.inject(Store);
  });
});
