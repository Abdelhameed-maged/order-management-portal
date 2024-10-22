import { Component, OnInit } from '@angular/core';
import { Product, ProductsServiceService } from 'src/app/api/services/products-service.service';
@Component({
  selector: 'app-products-wrapper',
  templateUrl: './products-wrapper.component.html',
  styleUrls: ['./products-wrapper.component.scss']
})
export class ProductsWrapperComponent implements OnInit {
  productsList: Product[] = [];
  constructor(private productsService: ProductsServiceService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res: Product[]) => {
      this.productsList = res;
    });
  }
}
