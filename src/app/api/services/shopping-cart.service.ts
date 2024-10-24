import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrdersServiceService, Order, OrderProduct } from './orders-service.service';
import { ProductsServiceService } from './products-service.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  constructor(private ordersService: OrdersServiceService, private productsService: ProductsServiceService) { }

  addItem(productId: number, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.findIndex(item => item.ProductId === productId);

    if (existingItemIndex > -1) {
      // Product exists in the cart, increment the quantity
      currentCart[existingItemIndex].Quantity += quantity;
      this.cartSubject.next([...currentCart]);
    } else {
      // Product does not exist in the cart, add it
      this.productsService.getProducts().subscribe(products => {
        const product = products.find(p => p.ProductId === productId);
        if (product) {
          const cartItem: CartItem = {
            ProductId: product.ProductId,
            ProductName: product.ProductName,
            Quantity: quantity,
            Price: product.ProductPrice,
            ProductImg: product.ProductImg
          };
          this.cartSubject.next([...currentCart, cartItem]);
        }
      });
    }
  }

  getItems() {
    return this.cart$;
  }

  editItem(productId: number, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const itemIndex = currentCart.findIndex(item => item.ProductId === productId);
    if (itemIndex > -1) {
      currentCart[itemIndex].Quantity = quantity;
      this.cartSubject.next([...currentCart]);
    }
  }

  deleteItem(productId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.ProductId !== productId);
    this.cartSubject.next(updatedCart);
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }

  checkout(userId: string, paymentType: string): void {
    const currentCart = this.cartSubject.value;
    const orderProducts: OrderProduct[] = currentCart.map(item => ({
      ProductId: item.ProductId,
      Quantity: item.Quantity
    }));

    const newOrder: Order = {
      OrderId: Date.now(), 
      OrderDate: new Date(),
      UserId: userId,
      Products: orderProducts,
      PaymentType: paymentType
    };

    this.ordersService.addOrder(newOrder);
    this.clearCart();
  }

  hasItems(): boolean {
    return this.cartSubject.value.length > 0;
  }
}

export interface CartItem {
  editing?: boolean;
  ProductId: number;
  ProductName: string;
  Quantity: number;
  Price: number;
  ProductImg: string;
}