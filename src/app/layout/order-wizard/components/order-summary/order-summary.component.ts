import { Component, OnInit } from '@angular/core';
import { OrderWizardService, Order } from 'src/app/api/services/order-wizard.service';
import { ProductsServiceService } from 'src/app/api/services/products-service.service';
import { OrdersServiceService } from 'src/app/api/services/orders-service.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/api/services/shopping-cart.service';
import { WizardService } from '../../services/wizard.service';
import { UsersService } from 'src/app/api/services/users.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  order!: Order;
  productsDetails: { ProductId: number; ProductName: string, Quantity: number; Total: number; ProductPrice?: number }[] = [];

  constructor(
    private orderWizardService: OrderWizardService,
    private productsService: ProductsServiceService,
    private ordersService: OrdersServiceService,
    private shoppingCartService: ShoppingCartService,
    private usersService: UsersService,
    private router: Router,
    private wizardService: WizardService
  ) { }

  ngOnInit(): void {
    this.orderWizardService.getOrderState().subscribe(order => {
      this.order = order;
      this.order.relatedUser = this.usersService.getUserById(this.order.UserId);
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    this.productsService.getProducts().subscribe(products => {
      this.productsDetails = this.order.Products.map(orderProduct => {
        const product = products.find(p => p.ProductId === orderProduct.ProductId);
        if (product) {
          return {
            ...product,
            Quantity: orderProduct.Quantity,
            Total: product.ProductPrice * orderProduct.Quantity
          };
        } else {
          return {
            ProductId: orderProduct.ProductId,
            ProductName: 'Unknown Product',
            Quantity: orderProduct.Quantity,
            Total: 0
          };
        }
      });
    });
  }

  confirmOrder(): void {
    const orderToSubmit = {
      ...this.order,
      OrderDate: new Date(this.order.OrderDate)
    };
    this.ordersService.addOrder(orderToSubmit);
    this.shoppingCartService.clearCart();
    this.orderWizardService.resetOrder();
    this.wizardService.resetSteps();

    this.router.navigate(['/orders']);
  }
}