import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalInformationComponent } from './personal-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/api/services/users.service';
import { OrderWizardService } from 'src/app/api/services/order-wizard.service';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard.service';
import { of } from 'rxjs';

describe('PersonalInformationComponent', () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let orderWizardService: jasmine.SpyObj<OrderWizardService>;
  let router: jasmine.SpyObj<Router>;
  let wizardService: jasmine.SpyObj<WizardService>;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['addUser', 'getUsers']);
    const orderWizardServiceSpy = jasmine.createSpyObj('OrderWizardService', ['setUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const wizardServiceSpy = jasmine.createSpyObj('WizardService', ['setStepCompleted']);

    await TestBed.configureTestingModule({
      declarations: [PersonalInformationComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: OrderWizardService, useValue: orderWizardServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: WizardService, useValue: wizardServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    orderWizardService = TestBed.inject(OrderWizardService) as jasmine.SpyObj<OrderWizardService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    wizardService = TestBed.inject(WizardService) as jasmine.SpyObj<WizardService>;

    usersService.getUsers.and.returnValue(of([
      { Id: '1', Name: 'User 1', Email: 'user1@example.com', Phone: '1234567890', Address: 'Address 1', RegisterDate: '2023-01-01' }
    ]));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update form when user is selected', () => {
    const target = new Event('change');
    Object.defineProperty(target, 'target', { value: { value: '1' } });
    component.onUserSelect(target);
    expect(component.userForm.value).toEqual({
      userId: '1',
      name: 'User 1',
      email: 'user1@example.com',
      phone: '1234567890',
      address: 'Address 1'
    });
  });

  it('should submit the form and navigate to payment method', () => {
    component.userForm.setValue({
      userId: '',
      name: 'New User',
      email: 'newuser@example.com',
      phone: '0987654321',
      address: 'New Address'
    });
    component.onSubmit();

    expect(usersService.addUser).toHaveBeenCalled();
    expect(orderWizardService.setUser).toHaveBeenCalledWith(jasmine.any(String));
    expect(wizardService.setStepCompleted).toHaveBeenCalledWith('personalInformation');
    expect(router.navigate).toHaveBeenCalledWith(['/order-wizard/payment-method']);
  });

  it('should not submit the form if invalid', () => {
    component.userForm.setValue({
      userId: '',
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    component.onSubmit();

    expect(usersService.addUser).not.toHaveBeenCalled();
    expect(orderWizardService.setUser).not.toHaveBeenCalled();
    expect(wizardService.setStepCompleted).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});