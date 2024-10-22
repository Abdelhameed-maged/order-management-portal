import { Component, OnInit } from '@angular/core';
import { Order, OrdersServiceService } from 'src/app/api/services/orders-service.service';

@Component({
  selector: 'app-orders-grid',
  templateUrl: './orders-grid.component.html',
  styleUrls: ['./orders-grid.component.scss']
})
export class OrdersGridComponent implements OnInit {
  isFirstOpen = true;
  ordersList: Order[] = [];
  constructor(private ordersService: OrdersServiceService) { }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((res) => this.ordersList = res)
  }

}
