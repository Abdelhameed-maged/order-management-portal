import { TestBed } from '@angular/core/testing';
import { OrderWizardService } from './order-wizard.service';

describe('OrderWizardService', () => {
  let service: OrderWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user ID', () => {
    service.setUser('1234');
    service.orderState$.subscribe(order => {
      expect(order.UserId).toBe('1234');
    });
  });

  it('should set products', () => {
    const products = [
      { ProductId: 124, Quantity: 2 },
      { ProductId: 127, Quantity: 1 }
    ];
    service.setProducts(products);
    service.orderState$.subscribe(order => {
      expect(order.Products).toEqual(products);
    });
  });

  it('should set payment type', () => {
    service.setPaymentType('online');
    service.orderState$.subscribe(order => {
      expect(order.PaymentType).toBe('online');
    });
  });

  it('should reset order state', () => {
    service.resetOrder();
    service.orderState$.subscribe(order => {
      expect(order.OrderId).toBeTruthy();
      expect(order.OrderDate).toBeTruthy();
      expect(order.UserId).toBe('');
      expect(order.Products).toEqual([]);
      expect(order.PaymentType).toBe('');
    });
  });
});