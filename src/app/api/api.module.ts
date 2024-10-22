import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersServiceService } from './services/orders-service.service';
import { ProductsServiceService } from './services/products-service.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    OrdersServiceService,
    ProductsServiceService
  ]
})
export class ApiModule { }
