import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ShoppingCartService, CartItem } from 'src/app/api/services/shopping-cart.service';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard.service';
import { OrderWizardService } from 'src/app/api/services/order-wizard.service';

@Component({
  selector: 'app-review-cart',
  templateUrl: './review-cart.component.html',
  styleUrls: ['./review-cart.component.scss']
})
export class ReviewCartComponent implements OnInit {
  cartForm!: FormGroup;
  cartItems: CartItem[] = [];

  constructor(
    private fb: FormBuilder,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private wizardService: WizardService,
    private orderWizardService: OrderWizardService 
  ) {}

  ngOnInit(): void {
    this.cartForm = this.fb.group({
      items: this.fb.array([])
    });

    this.shoppingCartService.cart$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.setCartItems(items);
    });

    this.items.valueChanges.subscribe((changes: CartItem[]) => {
      changes.forEach((item: CartItem) => {
        if (item.Quantity > 0) {
          this.shoppingCartService.editItem(item.ProductId, item.Quantity);
        } else {
          this.shoppingCartService.deleteItem(item.ProductId);
        }
      });
    });
  }

  get items(): FormArray {
    return this.cartForm.get('items') as FormArray;
  }

  setCartItems(items: CartItem[]): void {
    const itemFGs = items.map(item => this.fb.group({
      ProductId: [item.ProductId],
      ProductName: [item.ProductName],
      Quantity: [item.Quantity, [Validators.required, Validators.min(1)]],
      Price: [item.Price],
      ProductImg: [item.ProductImg]
    }));
    const itemFormArray = this.fb.array(itemFGs);
    this.cartForm.setControl('items', itemFormArray);
  }

  updateItem(index: number): void {
    const item = this.items.at(index).value;
    if (item.Quantity > 0) {
      this.shoppingCartService.editItem(item.ProductId, item.Quantity);
    } else {
      this.deleteItem(item.ProductId);
    }
  }

  deleteItem(productId: number): void {
    this.shoppingCartService.deleteItem(productId);
    this.items.removeAt(this.items.value.findIndex((item: { ProductId: number }) => item.ProductId === productId));
  }

  confirmOrder(): void {
    const products = this.cartItems.map(item => ({
      ProductId: item.ProductId,
      Quantity: item.Quantity
    }));
    this.orderWizardService.setProducts(products); // Set products in OrderWizardService
    this.wizardService.setStepCompleted('reviewOrder'); // Mark the review step as completed
    this.router.navigate(['/order-wizard/personal-information']);
  }
}