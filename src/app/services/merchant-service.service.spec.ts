import { TestBed } from '@angular/core/testing';

import { MerchantServiceService } from './merchant-service.service';

describe('MerchantServiceService', () => {
  let service: MerchantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
