import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import productsData from '../order-master-dp/porducts.json'
@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.initializeProducts(productsData) as Product[]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  updateProducts(newProducts: Product[]): void {
    const updatedProducts = this.initializeProducts(newProducts);
    this.productsSubject.next(updatedProducts);
  }

  private initializeProducts(products: Product[]): Product[] {
    return products.map(product => ({
      ...product,
      lowQuantity: product.AvailablePieces < 25
    }));
  }
  
  updateSingleProduct(product: Product) {
    const currentProducts = this.productsSubject.getValue();
    const productIndex = currentProducts.findIndex(p => p.ProductId === product.ProductId);

    if (productIndex !== -1) {
      currentProducts[productIndex] = {
        ...product,
        lowQuantity: product.AvailablePieces < 25
      };
      this.productsSubject.next([...currentProducts]);
    }
  }
}


export interface Product {
  ProductId: number;
  ProductName: string;
  ProductPrice: number;
  AvailablePieces: number;
  ProductImg: string;
  lowQuantity?: boolean
}