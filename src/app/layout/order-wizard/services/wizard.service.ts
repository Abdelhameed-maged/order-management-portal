import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private stepsCompleted = {
    personalInformation: false,
    reviewCart: false,
    paymentMethod: false,
    orderSummary: false,
  }
  private orderState = new BehaviorSubject<Record<string, boolean>>(this.stepsCompleted);
  orderState$ = this.orderState.asObservable();

  setStepCompleted(step: 'reviewOrder' | 'personalInformation' | 'paymentMethod' | 'orderSummary') {
    const currentState = this.orderState.value;
    currentState[step] = true;
    this.orderState.next(currentState);
  }

  isStepCompleted(step: 'reviewOrder' | 'personalInformation' | 'paymentMethod' | 'orderSummary') {
    return this.orderState.value[step];
  }

  getOrderState() {
    return this.orderState$;
  }

  isOrderComplete() {
    return Object.values(this.orderState.value).every(value => value === true);
  }

  resetSteps() {
    this.orderState.next(this.stepsCompleted);
  }
}
