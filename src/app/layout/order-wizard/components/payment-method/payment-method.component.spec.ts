import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentMethodComponent } from './payment-method.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderWizardService } from 'src/app/api/services/order-wizard.service';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard.service';

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;
  let orderWizardService: jasmine.SpyObj<OrderWizardService>;
  let router: jasmine.SpyObj<Router>;
  let wizardService: jasmine.SpyObj<WizardService>;

  beforeEach(async () => {
    const orderWizardServiceSpy = jasmine.createSpyObj('OrderWizardService', ['setPaymentType']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const wizardServiceSpy = jasmine.createSpyObj('WizardService', ['setStepCompleted']);

    await TestBed.configureTestingModule({
      declarations: [PaymentMethodComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: OrderWizardService, useValue: orderWizardServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: WizardService, useValue: wizardServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
    orderWizardService = TestBed.inject(OrderWizardService) as jasmine.SpyObj<OrderWizardService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    wizardService = TestBed.inject(WizardService) as jasmine.SpyObj<WizardService>;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.paymentForm).toBeDefined();
    expect(component.paymentForm.get('paymentType')).toBeDefined();
    expect(component.paymentForm.get('paymentType')?.valid).toBeFalse();
  });

  it('should submit the form and navigate to order summary', () => {
    component.paymentForm.setValue({ paymentType: 'online' });
    component.onSubmit();

    expect(orderWizardService.setPaymentType).toHaveBeenCalledWith('online');
    expect(wizardService.setStepCompleted).toHaveBeenCalledWith('paymentMethod');
    expect(router.navigate).toHaveBeenCalledWith(['/order-wizard/order-summary']);
  });

  it('should not submit the form if invalid', () => {
    component.paymentForm.setValue({ paymentType: '' });
    component.onSubmit();

    expect(orderWizardService.setPaymentType).not.toHaveBeenCalled();
    expect(wizardService.setStepCompleted).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
