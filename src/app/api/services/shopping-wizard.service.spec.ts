import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { OrdersServiceService } from './orders-service.service';
import { ProductsServiceService } from './products-service.service';
import { of } from 'rxjs';

describe('ShoppingWizardService', () => {
  let service: ShoppingCartService;
  let productsService: jasmine.SpyObj<ProductsServiceService>;

  beforeEach(() => {
    const ordersServiceSpy = jasmine.createSpyObj('OrdersServiceService', ['addOrder']);
    const productsServiceSpy = jasmine.createSpyObj('ProductsServiceService', ['getProducts']);

    TestBed.configureTestingModule({
      providers: [
        ShoppingCartService,
        { provide: OrdersServiceService, useValue: ordersServiceSpy },
        { provide: ProductsServiceService, useValue: productsServiceSpy }
      ]
    });

    service = TestBed.inject(ShoppingCartService);
    productsService = TestBed.inject(ProductsServiceService) as jasmine.SpyObj<ProductsServiceService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    const product = { ProductId: 1, ProductName: 'Test Product', ProductPrice: 100, ProductImg: 'test-product.jpg', AvailablePieces: 10 };
    productsService.getProducts.and.returnValue(of([product]));

    service.addItem(1, 2);
    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].ProductId).toBe(1);
      expect(cartItems[0].Quantity).toBe(2);
    });
  });

  it('should increment the quantity of an existing item in the cart', () => {
    const product = { ProductId: 1, ProductName: 'Test Product', ProductPrice: 100, ProductImg: 'test-product.jpg', AvailablePieces: 10 };
    productsService.getProducts.and.returnValue(of([product]));

    service.addItem(1, 2);
    service.addItem(1, 3);
    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].ProductId).toBe(1);
      expect(cartItems[0].Quantity).toBe(5);
    });
  });

  it('should edit an item in the cart', () => {
    const product = { ProductId: 1, ProductName: 'Test Product', ProductPrice: 100, ProductImg: 'test-product.jpg', AvailablePieces: 10 };
    productsService.getProducts.and.returnValue(of([product]));

    service.addItem(1, 2);
    service.editItem(1, 5);
    service.cart$.subscribe(cartItems => {
      expect(cartItems[0].Quantity).toBe(5);
    });
  });

  it('should delete an item from the cart', () => {
    const product = { ProductId: 1, ProductName: 'Test Product', ProductPrice: 100, ProductImg: 'test-product.jpg', AvailablePieces: 10 };
    productsService.getProducts.and.returnValue(of([product]));

    service.addItem(1, 2);
    service.deleteItem(1);
    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });

  it('should clear the cart on checkout', () => {
    const product = { ProductId: 1, ProductName: 'Test Product', ProductPrice: 100, ProductImg: 'test-product.jpg', AvailablePieces: 10 };
    productsService.getProducts.and.returnValue(of([product]));

    service.addItem(1, 2);
    service.checkout('1234-5678-9012', 'online');
    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });
});