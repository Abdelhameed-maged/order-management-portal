import { TestBed } from '@angular/core/testing';
import { OrdersServiceService, Order } from './orders-service.service';
import { ProductsServiceService } from './products-service.service';
import { UsersService } from './users.service';

describe('OrdersServiceService', () => {
  let service: OrdersServiceService;

  beforeEach(() => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsServiceService', ['getProducts']);
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUsers']);

    TestBed.configureTestingModule({
      providers: [
        OrdersServiceService,
        { provide: ProductsServiceService, useValue: productsServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy }
      ]
    });

    service = TestBed.inject(OrdersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an order', () => {
    const mockOrder: Order = {
      OrderId: 1,
      OrderDate: new Date('2023-01-01'),
      UserId: '123',
      Products: [],
      PaymentType: 'online'
    };
    service.addOrder(mockOrder);
    service.orders$.subscribe(orders => {
      expect(orders).toContain(jasmine.objectContaining(mockOrder));
    });
  });

  it('should update orders', () => {
    const mockOrders: Order[] = [
      { OrderId: 1, OrderDate: new Date('2023-01-01'), UserId: '123', Products: [], PaymentType: 'online' },
      { OrderId: 2, OrderDate: new Date('2023-01-02'), UserId: '124', Products: [], PaymentType: 'cash' }
    ];
    service.updateOrders(mockOrders);
    service.orders$.subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });
  });

  it('should get order by ID', () => {
    const mockOrder: Order = {
      OrderId: 1,
      OrderDate: new Date('2023-01-01'),
      UserId: '123',
      Products: [],
      PaymentType: 'online'
    };
    service.updateOrders([mockOrder]);
    service.getOrderById(1).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });
  });

  it('should return undefined if order ID is not found', () => {
    service.updateOrders([]);
    service.getOrderById(999).subscribe(order => {
      expect(order).toBeUndefined();
    });
  });
});