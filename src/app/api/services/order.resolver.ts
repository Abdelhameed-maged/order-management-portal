import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrdersServiceService, Order } from './orders-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<Order | undefined> {
  constructor(private ordersService: OrdersServiceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order | undefined> {
    const orderId = Number(route.paramMap.get('id'));
    return this.ordersService.getOrderById(orderId);
  }
}