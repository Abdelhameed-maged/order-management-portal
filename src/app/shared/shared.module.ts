import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from '../api/api.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DynamicModalComponent } from './components/dynamic-modal/dynamic-modal.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    NavbarComponent,
    DynamicModalComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ApiModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ApiModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
