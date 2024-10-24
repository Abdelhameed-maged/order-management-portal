import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersGridComponent } from './components/orders-grid/orders-grid.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderPageComponent } from './components/order-page/order-page.component';

@NgModule({
  declarations: [
    OrdersGridComponent,
    OrderDetailsComponent,
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    AccordionModule,
    SharedModule,
  ]
})
export class OrdersModule { }
