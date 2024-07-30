import { Component } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent {
  products: any;
  errMessage: string = ''
  constructor(public _service: ProductApiService, private _router: Router) {
    this.getProducts()
  }

  getProducts() {
    this._service.getProducts().subscribe({
      next: (data) => { this.products = data },
      error: (err) => { this.errMessage = err }
    })
  }

  createProduct() {
    this._router.navigate(['product-admin/new'])
  }

  updateProduct(productId: string) {
    this._router.navigate(['product-admin/edit', productId])
  }

  detailProduct(productId: string) {
    this._router.navigate(['product-admin/detail', productId])
  }

  deleteProduct(productId: string) {

    this._service.deleteProduct(productId).subscribe({
      next: (data) => {
        this.products = data
      },
      error: (err) => { this.errMessage = err },
    })
}
}
