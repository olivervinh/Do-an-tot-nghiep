import { TestBed } from '@angular/core/testing';

import { DiscountCodeService } from './discount-code.service';

describe('DiscountCodeService', () => {
  let service: DiscountCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
