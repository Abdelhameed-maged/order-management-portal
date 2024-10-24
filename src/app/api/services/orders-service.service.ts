import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ordersData from '../order-master-dp/orders.json';
import usersData from '../order-master-dp/users.json';
import { ProductsServiceService } from './products-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'platform'
})
export class OrdersServiceService {
  private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(ordersData);
  public orders$: Observable<Order[]> = this.ordersSubject.asObservable();

  constructor(private productService: ProductsServiceService) { }

  getOrders(): Observable<Order[]> {
    this.productService.getProducts().subscribe((res) => {
      ordersData.forEach((order: Order) => {
        const user = usersData.find((u) => u.Id === order.UserId);
        order.relatedUser = user;
        
        (order.Products as unknown as OrderProduct[]).forEach((o) => {
          const product = res.find((r) => r.ProductId === o.ProductId);
          o.ProductName = product ? product.ProductName : 'N/A';
          o.ProductImg = product ? product.ProductImg : '';
          o.Price = product ? product.ProductPrice : 0;
        });
      });
      this.updateOrders(ordersData as unknown as Order[]);
    });
    return this.orders$;
  }

  addOrder(order: Order): void {
    const currentOrders = this.ordersSubject.value;
    this.ordersSubject.next([...currentOrders, order]);
  }

  updateOrders(newOrders: Order[]): void {
    this.ordersSubject.next(newOrders);
  }

  getOrderById(orderId: number): Observable<Order | undefined> {
    return this.orders$.pipe(
      map((orders: Order[]) => {
        const order = orders.find(o => o.OrderId === orderId);
        if (order) {
          const user = usersData.find((u) => u.Id === order.UserId);
          order.relatedUser = user;

          (order.Products as unknown as OrderProduct[]).forEach((o) => {
            const product = this.productService.getProducts().pipe(
              map(products => products.find(p => p.ProductId === o.ProductId))
            );
            product.subscribe(p => {
              o.ProductName = p ? p.ProductName : 'N/A';
              o.ProductImg = p ? p.ProductImg : '';
              o.Price = p ? p.ProductPrice : 0;
            });
          });
        }
        return order;
      })
    );
  }
}

export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: OrderProduct[];
  PaymentType: string;
  relatedUser?: User;
}

export interface OrderProduct {
  ProductId: number;
  Quantity: number;
  ProductName?: string;
  ProductImg?: string;
  Price?: number;
}

export interface User {
  Id: string,
  Name: string,
  Email: string,
  Phone: string,
  Address: string,
  RegisterDate: string
}