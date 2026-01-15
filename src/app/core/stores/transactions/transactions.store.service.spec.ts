import { TestBed } from '@angular/core/testing';

import { TransactionsStoreService } from './transactions.store.service';

describe('TransactionsStoreService', () => {
  let service: TransactionsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
