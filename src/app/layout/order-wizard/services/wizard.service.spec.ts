import { TestBed } from '@angular/core/testing';
import { WizardService } from './wizard.service';

describe('WizardService', () => {
  let service: WizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mark a step as completed', () => {
    service.setStepCompleted('reviewOrder');
    expect(service.isStepCompleted('reviewOrder')).toBeTrue();
  });

  it('should not mark a step as completed if it is not set', () => {
    expect(service.isStepCompleted('personalInformation')).toBeFalse();
  });

  it('should reset steps', () => {
    service.setStepCompleted('reviewOrder');
    service.setStepCompleted('personalInformation');
    service.setStepCompleted('paymentMethod');
    service.setStepCompleted('orderSummary');
    expect(service.isStepCompleted('reviewOrder')).toBeFalse();
    expect(service.isStepCompleted('personalInformation')).toBeFalse();
    expect(service.isStepCompleted('paymentMethod')).toBeFalse();
    expect(service.isStepCompleted('orderSummary')).toBeFalse();
  });

  it('should return the order state as an observable', (done: DoneFn) => {
    service.getOrderState().subscribe(state => {
      expect(state).toEqual({
        personalInformation: false,
        reviewCart: false,
        paymentMethod: false,
        orderSummary: false,
      });
      done();
    });
  });

  it('should check if the order is complete', () => {
    service.setStepCompleted('reviewOrder');
    service.setStepCompleted('personalInformation');
    service.setStepCompleted('paymentMethod');
    service.setStepCompleted('orderSummary');
    expect(service.isOrderComplete()).toBeTrue();
  });

  it('should check if the order is not complete', () => {
    service.setStepCompleted('reviewOrder');
    service.setStepCompleted('personalInformation');
    service.setStepCompleted('paymentMethod');
    expect(service.isOrderComplete()).toBeFalse();
  });
});