import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DynamicModalComponent } from './components/dynamic-modal/dynamic-modal.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NavbarComponent,
    DynamicModalComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    // components
    NavbarComponent,
    ShoppingCartComponent,
    // modules
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
