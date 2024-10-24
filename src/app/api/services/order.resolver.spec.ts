import { TestBed } from '@angular/core/testing';
import { OrderResolver } from './order.resolver';
import { OrdersServiceService } from './orders-service.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

describe('OrderResolver', () => {
  let resolver: OrderResolver;
  let ordersService: jasmine.SpyObj<OrdersServiceService>;

  beforeEach(() => {
    const ordersServiceSpy = jasmine.createSpyObj('OrdersServiceService', ['getOrderById']);

    TestBed.configureTestingModule({
      providers: [
        OrderResolver,
        { provide: OrdersServiceService, useValue: ordersServiceSpy }
      ]
    });

    resolver = TestBed.inject(OrderResolver);
    ordersService = TestBed.inject(OrdersServiceService) as jasmine.SpyObj<OrdersServiceService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve an order by ID', () => {
    const mockOrder = { OrderId: 1, OrderDate: new Date('2023-01-01'), UserId: '123', Products: [], PaymentType: 'online' };
    ordersService.getOrderById.and.returnValue(of(mockOrder));

    const route = new ActivatedRouteSnapshot();
    route.params = { id: '1' };
    const state = {} as RouterStateSnapshot;

    resolver.resolve(route, state).subscribe(order => {
      expect(order).toEqual(mockOrder);
      expect(ordersService.getOrderById).toHaveBeenCalledWith(1);
    });
  });

  it('should return undefined if order ID is not found', () => {
    ordersService.getOrderById.and.returnValue(of(undefined));

    const route = new ActivatedRouteSnapshot();
    route.params = { id: '999' };
    const state = {} as RouterStateSnapshot;

    resolver.resolve(route, state).subscribe(order => {
      expect(order).toBeUndefined();
      expect(ordersService.getOrderById).toHaveBeenCalledWith(999);
    });
  });
});