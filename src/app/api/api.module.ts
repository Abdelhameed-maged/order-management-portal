import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersServiceService } from './services/orders-service.service';
import { ProductsServiceService } from './services/products-service.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ShoppingCartService } from './services/shopping-cart.service';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class ApiModule {
  static forRoot(): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        OrdersServiceService,
        ProductsServiceService,
        ShoppingCartService,
        provideHttpClient(withInterceptorsFromDi())
      ]
    };
  }
}