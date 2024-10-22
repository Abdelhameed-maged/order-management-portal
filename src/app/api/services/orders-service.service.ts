import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ordersData from '../order-master-dp/orders.json';
import { ProductsServiceService } from './products-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  public orders$: Observable<Order[]> = this.ordersSubject.asObservable();

  constructor(private productService: ProductsServiceService) { }

  getOrders(): Observable<Order[]> {
    this.productService.getProducts().subscribe((res) => {
      ordersData.forEach((order) => {
        (order.Products as unknown as OrderProduct[]).forEach((o) => {
          const product = res.find((r) => r.ProductId === o.ProductId);
          o.ProductName = product ? product.ProductName : 'N/A';
          o.ProductImg = product ? product.ProductImg : '';
          o.Price = product ? product.ProductPrice : 0;


        })
      })
    } );
    this.updateOrders(ordersData as unknown as Order[]);
    return this.orders$;
  }

  updateOrders(newOrders: Order[]): void {
    this.ordersSubject.next(newOrders);
  }
}

export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: OrderProduct[];
  PaymentType: string;
}

export interface OrderProduct {
  ProductId: number;
  Quantity: number;
  ProductName: string;
  ProductImg: string;
  Price: number
}