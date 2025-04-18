import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { UnitState } from './unit.state';

describe('Demo store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([UnitState])]

    });

    store = TestBed.inject(Store);
  });
});
