import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersServiceService } from './services/orders-service.service';
import { ProductsServiceService } from './services/products-service.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



@NgModule({ declarations: [], imports: [CommonModule], providers: [
        OrdersServiceService,
        ProductsServiceService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ApiModule { }
