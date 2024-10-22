import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderWizardRoutingModule } from './order-wizard-routing.module';
import { ReviewCartComponent } from './components/review-cart/review-cart.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';


@NgModule({
  declarations: [
    ReviewCartComponent,
    PersonalInformationComponent,
    PaymentMethodComponent,
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    OrderWizardRoutingModule
  ]
})
export class OrderWizardModule { }
