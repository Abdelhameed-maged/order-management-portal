import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewCartComponent } from './review-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartService } from 'src/app/api/services/shopping-cart.service';
import { OrderWizardService } from 'src/app/api/services/order-wizard.service';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard.service';
import { of } from 'rxjs';

describe('ReviewCartComponent', () => {
  let component: ReviewCartComponent;
  let fixture: ComponentFixture<ReviewCartComponent>;
  let shoppingCartService: jasmine.SpyObj<ShoppingCartService>;
  let orderWizardService: jasmine.SpyObj<OrderWizardService>;
  let router: jasmine.SpyObj<Router>;
  let wizardService: jasmine.SpyObj<WizardService>;

  beforeEach(async () => {
    const shoppingCartServiceSpy = jasmine.createSpyObj('ShoppingCartService', ['cart$', 'editItem', 'deleteItem']);
    const orderWizardServiceSpy = jasmine.createSpyObj('OrderWizardService', ['setProducts']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const wizardServiceSpy = jasmine.createSpyObj('WizardService', ['setStepCompleted']);

    await TestBed.configureTestingModule({
      declarations: [ReviewCartComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartServiceSpy },
        { provide: OrderWizardService, useValue: orderWizardServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: WizardService, useValue: wizardServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewCartComponent);
    component = fixture.componentInstance;
    shoppingCartService = TestBed.inject(ShoppingCartService) as jasmine.SpyObj<ShoppingCartService>;
    orderWizardService = TestBed.inject(OrderWizardService) as jasmine.SpyObj<OrderWizardService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    wizardService = TestBed.inject(WizardService) as jasmine.SpyObj<WizardService>;

    shoppingCartServiceSpy.cart$.and.returnValue(of([
      { ProductId: 1, ProductName: 'Product 1', Quantity: 2, Price: 100, ProductImg: 'img1.jpg' },
      { ProductId: 2, ProductName: 'Product 2', Quantity: 1, Price: 200, ProductImg: 'img2.jpg' }
    ]));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.cartForm).toBeDefined();
    expect(component.items.length).toBe(2);
  });

  it('should update an item', () => {
    component.items.at(0).get('Quantity')?.setValue(3);
    component.updateItem(0);

    expect(shoppingCartService.editItem).toHaveBeenCalledWith(1, 3);
  });

  it('should delete an item', () => {
    component.deleteItem(1);

    expect(shoppingCartService.deleteItem).toHaveBeenCalledWith(1);
    expect(component.items.length).toBe(1);
  });

  it('should confirm the order and navigate to personal information', () => {
    component.confirmOrder();

    expect(orderWizardService.setProducts).toHaveBeenCalledWith([
      { ProductId: 1, Quantity: 2 },
      { ProductId: 2, Quantity: 1 }
    ]);
    expect(wizardService.setStepCompleted).toHaveBeenCalledWith('reviewOrder');
    expect(router.navigate).toHaveBeenCalledWith(['/order-wizard/personal-information']);
  });
});