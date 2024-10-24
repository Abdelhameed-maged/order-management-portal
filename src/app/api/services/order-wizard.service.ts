import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './orders-service.service';

export interface Order {
  OrderId: number;
  OrderDate: Date;
  UserId: string;
  Products: { ProductId: number; Quantity: number }[];
  PaymentType: string;
  relatedUser?: User;
}

@Injectable({
  providedIn: 'root'
})
export class OrderWizardService {
  private orderState: BehaviorSubject<Order> = new BehaviorSubject<Order>({
    OrderId: new Date().getTime(),
    OrderDate: new Date(),
    UserId: '',
    Products: [],
    PaymentType: ''
  });

  orderState$ = this.orderState.asObservable();

  setUser(userId: string): void {
    const currentOrder = this.orderState.value;
    currentOrder.UserId = userId;
    this.orderState.next(currentOrder);
  }

  setProducts(products: { ProductId: number; Quantity: number }[]): void {
    const currentOrder = this.orderState.value;
    currentOrder.Products = products;
    this.orderState.next(currentOrder);
  }

  setPaymentType(paymentType: string): void {
    const currentOrder = this.orderState.value;
    currentOrder.PaymentType = paymentType;
    this.orderState.next(currentOrder);
  }
  
  getOrderState(): Observable<Order> {
    return this.orderState$;
  }
  resetOrder(): void {
    this.orderState.next({
      OrderId: new Date().getTime(),
      OrderDate: new Date(),
      UserId: '',
      Products: [],
      PaymentType: '',
    });
  }
}