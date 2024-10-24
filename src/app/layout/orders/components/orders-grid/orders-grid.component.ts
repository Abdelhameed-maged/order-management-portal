import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersServiceService } from 'src/app/api/services/orders-service.service';

@Component({
  selector: 'app-orders-grid',
  templateUrl: './orders-grid.component.html',
  styleUrls: ['./orders-grid.component.scss']
})
export class OrdersGridComponent implements OnInit {
  isFirstOpen = true;
  ordersList: Order[] = [];
  constructor(private ordersService: OrdersServiceService, private router: Router) { }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((res) => this.ordersList = res)
  }

  navToOrder(id: number): void {
    this.router.navigate([`/orders/order/${id}`]);
  }
}
