import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { WizardService } from './wizard.service';
import { ShoppingCartService } from 'src/app/api/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class WizardGuardService implements CanActivate {

  constructor(
    private wizardService: WizardService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const step = route.routeConfig?.path;

    // Check if there are items in the cart
    if (!this.shoppingCartService.hasItems()) {
      this.router.navigate(['/products']);
      return false;
    }

    if (step === 'personal-information' && !this.wizardService.isStepCompleted('reviewOrder')) {
      this.router.navigate(['/order-wizard/review-order']);
      return false;
    }
    if (step === 'payment-method' && !this.wizardService.isStepCompleted('personalInformation')) {
      this.router.navigate(['/order-wizard/review-order']);
      return false;
    }
    if (step === 'order-summary' && !this.wizardService.isStepCompleted('paymentMethod')) {
      this.router.navigate(['/order-wizard/payment-method']);
      return false;
    }
    return true;
  }
}