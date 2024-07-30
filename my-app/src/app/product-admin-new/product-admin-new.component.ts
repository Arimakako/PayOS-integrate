import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Products';
import { ProductApiService } from '../product-api.service';
@Component({
  selector: 'app-product-admin-new',
  templateUrl: './product-admin-new.component.html',
  styleUrls: ['./product-admin-new.component.css']
})
export class ProductAdminNewComponent {
  product = new Product()
  errMessage: string = ''

  constructor(private _service: ProductApiService, private _router: Router) { }

  public setProduct(f: Product) {
    this.product = f
  }

  onFileSelected(event: any, product: Product) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      product.img = reader.result!.toString()
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
  }

  postProduct() {
    if (
      this.product.pettype.toString() === '' ||
      this.product.name.toString() === '' ||
      this.product.price.toString() === '' ||
      this.product.cate.toString() === '' ||
      this.product.des.toString() === ''
    ) {
      this.invalidProduct();
    } else {
      this._service.postProduct(this.product).subscribe({
        next: (data) => { this.product = data, this.success() },
        error: (err) => { this.errMessage = err },
      })
    }
  }

  invalidProduct() {
    this.errMessage = 'Invalid product. Full information is required'
  }

  // notify user of successful post
  success() {
    window.alert('Product successfully posted')
    this.cancel()
  }

  // route admin to fashions page
  cancel() {
    this._router.navigate(['/product-admin'])
  }
}
