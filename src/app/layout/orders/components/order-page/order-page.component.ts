import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../../api/services/orders-service.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  orderDetails!: Order;
  totalItems = 0;
  totalPrice = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.orderDetails = data['order'] as unknown as Order;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    if (this.orderDetails) {
      this.totalItems = this.orderDetails.Products.reduce((sum, item) => sum + item.Quantity, 0);
      this.totalPrice = this.orderDetails.Products.reduce((sum, item) => sum + ((item.Price ?? 0) * item.Quantity), 0);
    }
  }
}