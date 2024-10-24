import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/api/services/orders-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderDetails!: Order;
  totalItems: number = 0;
  totalPrice: number = 0
  constructor() { }

  ngOnInit(): void {

    this.orderDetails.Products.forEach((d) =>{
      this.totalItems = this.totalItems + d.Quantity;
      if (d.Price !== undefined) {
        this.totalPrice = this.totalPrice + (d.Quantity * d.Price);
      }
    })
  }

}
