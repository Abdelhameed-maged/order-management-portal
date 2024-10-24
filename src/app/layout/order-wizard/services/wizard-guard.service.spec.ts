/* eslint-disable */
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WizardGuardService } from './wizard-guard.service';
import { WizardService } from './wizard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ShoppingCartService } from 'src/app/api/services/shopping-cart.service';

describe('WizardGuardService', () => {
  let guard: WizardGuardService;
  let wizardService: jasmine.SpyObj<WizardService>;
  let shoppingCartService: jasmine.SpyObj<ShoppingCartService>;
  let router: Router;

  beforeEach(() => {
    const wizardServiceSpy = jasmine.createSpyObj('WizardService', ['isStepCompleted']);
    const shoppingCartServiceSpy = jasmine.createSpyObj('ShoppingCartService', ['hasItems']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        WizardGuardService,
        { provide: WizardService, useValue: wizardServiceSpy },
        { provide: ShoppingCartService, useValue: shoppingCartServiceSpy }
      ]
    });

    guard = TestBed.inject(WizardGuardService);
    wizardService = TestBed.inject(WizardService) as jasmine.SpyObj<WizardService>;
    shoppingCartService = TestBed.inject(ShoppingCartService) as jasmine.SpyObj<ShoppingCartService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not activate route if there are no items in the cart', () => {
    shoppingCartService.hasItems.and.returnValue(false);
    const route = { routeConfig: { path: 'personal-information' } } as any;
    spyOn(router, 'navigate');

    const result = guard.canActivate(route);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/order-wizard/review-order']);
  });

  it('should activate route if there are items in the cart and steps are completed', () => {
    shoppingCartService.hasItems.and.returnValue(true);
    wizardService.isStepCompleted.and.returnValue(true);
    const route = { routeConfig: { path: 'personal-information' } } as any;

    const result = guard.canActivate(route);

    expect(result).toBeTrue();
  });

  it('should not activate route if steps are not completed', () => {
    shoppingCartService.hasItems.and.returnValue(true);
    wizardService.isStepCompleted.and.callFake(step => step !== 'reviewOrder');
    const route = { routeConfig: { path: 'personal-information' } } as any;
    spyOn(router, 'navigate');

    const result = guard.canActivate(route);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/order-wizard/review-order']);
  });
});