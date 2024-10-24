import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSummaryComponent } from './order-summary.component';
import { OrderWizardService } from 'src/app/api/services/order-wizard.service';
import { ProductsServiceService } from 'src/app/api/services/products-service.service';
import { OrdersServiceService } from 'src/app/api/services/orders-service.service';
import { ShoppingCartService } from 'src/app/api/services/shopping-cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let orderWizardService: jasmine.SpyObj<OrderWizardService>;
  let productsService: jasmine.SpyObj<ProductsServiceService>;
  let ordersService: jasmine.SpyObj<OrdersServiceService>;
  let shoppingCartService: jasmine.SpyObj<ShoppingCartService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const orderWizardServiceSpy = jasmine.createSpyObj('OrderWizardService', ['getOrderState', 'resetOrder']);
    const productsServiceSpy = jasmine.createSpyObj('ProductsServiceService', ['getProducts']);
    const ordersServiceSpy = jasmine.createSpyObj('OrdersServiceService', ['addOrder']);
    const shoppingCartServiceSpy = jasmine.createSpyObj('ShoppingCartService', ['clearCart']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent],
      providers: [
        { provide: OrderWizardService, useValue: orderWizardServiceSpy },
        { provide: ProductsServiceService, useValue: productsServiceSpy },
        { provide: OrdersServiceService, useValue: ordersServiceSpy },
        { provide: ShoppingCartService, useValue: shoppingCartServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    orderWizardService = TestBed.inject(OrderWizardService) as jasmine.SpyObj<OrderWizardService>;
    productsService = TestBed.inject(ProductsServiceService) as jasmine.SpyObj<ProductsServiceService>;
    ordersService = TestBed.inject(OrdersServiceService) as jasmine.SpyObj<OrdersServiceService>;
    shoppingCartService = TestBed.inject(ShoppingCartService) as jasmine.SpyObj<ShoppingCartService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    orderWizardService.getOrderState.and.returnValue(of({
      OrderId: 1,
      OrderDate: new Date('2023-01-01'),
      UserId: '123',
      Products: [{ ProductId: 1, Quantity: 2 }],
      PaymentType: 'online'
    }));

    productsService.getProducts.and.returnValue(of([
      { ProductId: 1, ProductName: 'Product 1', ProductPrice: 100, AvailablePieces: 10, ProductImg: 'product-1.jpg' }
    ]));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load product details', () => {
    fixture.detectChanges();
    expect(component.productsDetails.length).toBe(1);
    expect(component.productsDetails[0].ProductName).toBe('Product 1');
    expect(component.productsDetails[0].Total).toBe(200);
  });

  it('should confirm order', () => {
    fixture.detectChanges();
    component.confirmOrder();
    expect(ordersService.addOrder).toHaveBeenCalled();
    expect(shoppingCartService.clearCart).toHaveBeenCalled();
    expect(orderWizardService.resetOrder).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/orders']);
  });
});