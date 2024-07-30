import { Component } from '@angular/core';
import {ProductApiService} from '../product-api.service'
@Component({
  selector: 'app-product-admin-delete',
  templateUrl: './product-admin-delete.component.html',
  styleUrls: ['./product-admin-delete.component.css']
})
export class ProductAdminDeleteComponent {
  products: any
  productId: string = ''
  errMessage: string = ''

  constructor(private _service: ProductApiService) {
    this._service.getProducts().subscribe({
      next: (data) => { this.products = data },
      error: (err) => { this.errMessage = err },
    })
  }

  // delete product
  deleteProduct(productId: string) {

      this._service.deleteProduct(productId).subscribe({
        next: (data) => {
          this.products = data
        },
        error: (err) => { this.errMessage = err },
      })
  }

  // get products
  getProducts() {
    this._service.getProducts().subscribe({
      next: (data) => { this.products = data },
      error: (err) => { this.errMessage = err },
    })
  }


}
