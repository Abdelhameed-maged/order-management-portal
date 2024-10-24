import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ReviewCartComponent } from './components/review-cart/review-cart.component';
import { WizardGuardService } from './services/wizard-guard.service';

const routes: Routes = [
  {path: 'review-order', component: ReviewCartComponent, canActivate: [WizardGuardService]},
  {path: 'personal-information', component: PersonalInformationComponent, canActivate: [WizardGuardService]},
  {path: 'payment-method', component: PaymentMethodComponent, canActivate : [WizardGuardService]},  
  {path: 'order-summary', component: OrderSummaryComponent, canActivate: [WizardGuardService]},
  {path: '', redirectTo: 'review-order', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderWizardRoutingModule { }
