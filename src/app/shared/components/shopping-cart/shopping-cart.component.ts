import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingCartService, CartItem } from '../../../api/services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartForm!: FormGroup;
  cartFormVisible = false;
  currentProductId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartForm = this.fb.group({
      Quantity: ['', [Validators.required, Validators.min(1)]]
    });
    this.shoppingCartService.cart$.subscribe((items: CartItem[]) => {
      this.cartItems = items.map(item => ({ ...item, editing: false }));
    });
  }

  updateItem(item: CartItem): void {
    if (item.Quantity > 0) {
      this.shoppingCartService.editItem(item.ProductId, item.Quantity);
      item.editing = false;
    } else {
      this.deleteItem(item.ProductId);
    }
  }

  deleteItem(productId: number): void {
    this.shoppingCartService.deleteItem(productId);
  }

  checkout(): void {
    this.router.navigate(['/order-wizard/review-order']);
  }
}