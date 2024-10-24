import { TestBed } from '@angular/core/testing';
import { ProductsServiceService } from './products-service.service';

describe('ProductsServiceService', () => {
  let service: ProductsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
    });
  });

  it('should update products', () => {
    const newProducts = [
      { ProductId: 1, ProductName: 'Product 1', AvailablePieces: 10, ProductPrice: 50, ProductImg: 'product-1.jpg' },
      { ProductId: 2, ProductName: 'Product 2', AvailablePieces: 30, ProductPrice: 75, ProductImg: 'product-2.jpg' }
    ];
    service.updateProducts(newProducts);
    service.getProducts().subscribe(products => {
      expect(products).toEqual(newProducts);
    });
  });

  it('should update a single product', () => {
    const initialProducts = [
      { ProductId: 1, ProductName: 'Product 1', AvailablePieces: 10, ProductPrice: 50, ProductImg: 'product-1.jpg' },
      { ProductId: 2, ProductName: 'Product 2', AvailablePieces: 30, ProductPrice: 75, ProductImg: 'product-2.jpg' }
    ];
    service.updateProducts(initialProducts);

    const updatedProduct = { 
      ProductId: 1, 
      ProductName: 'Updated Product 1', 
      ProductPrice: 100, 
      AvailablePieces: 20, 
      ProductImg: 'updated-product-1.jpg' 
    };
    service.updateSingleProduct(updatedProduct);

    service.getProducts().subscribe(products => {
      const product = products.find(p => p.ProductId === updatedProduct.ProductId);
      expect(product).toEqual(updatedProduct);
    });
  });
});