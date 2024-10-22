import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsWrapperComponent } from './components/products-wrapper/products-wrapper.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ProductsWrapperComponent,
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [BsModalService ]
})
export class ProductsModule { }
