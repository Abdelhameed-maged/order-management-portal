import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderWizardService } from 'src/app/api/services/order-wizard.service';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  paymentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderWizardService: OrderWizardService,
    private router: Router,
    private wizardService: WizardService
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentType = this.paymentForm.value.paymentType;
      this.orderWizardService.setPaymentType(paymentType);
      this.wizardService.setStepCompleted('paymentMethod');
      this.router.navigate(['/order-wizard/order-summary']);
    }
  }
}