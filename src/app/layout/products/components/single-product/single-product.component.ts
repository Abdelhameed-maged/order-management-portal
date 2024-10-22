import { Component, Input, OnInit,TemplateRef  } from '@angular/core';
import { Product, ProductsServiceService } from 'src/app/api/services/products-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  @Input() productDetails?: Product;  
  modalRef?: BsModalRef;
  editForm!: FormGroup;

  constructor(
    private modalService: BsModalService, 
    private fb: FormBuilder,
    private productService: ProductsServiceService) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      quantity: [this.productDetails?.AvailablePieces || 0]
    });
  }

  editProduct(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
  }

  saveProduct() {
    if (this.editForm.valid) {
      const updatedQuantity = this.editForm.get('quantity')?.value;
      if (this.productDetails) {
        this.productDetails.AvailablePieces = updatedQuantity;
        this.productService.updateSingleProduct(this.productDetails);
      }

      this.modalRef?.hide();
    }
  }
}
