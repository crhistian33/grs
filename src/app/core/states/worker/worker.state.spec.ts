import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { WorkerState } from './worker.state';

describe('Demo store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([WorkerState])]

    });

    store = TestBed.inject(Store);
  });
});
