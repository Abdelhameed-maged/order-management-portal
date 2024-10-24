import { TestBed } from '@angular/core/testing';

import { shoppingCartService } from './shopping-cart.service';

describe('shoppingCartService', () => {
  let service: shoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(shoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
