import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Products';
import { ProductApiService } from '../product-api.service';
@Component({
  selector: 'app-product-admin-detail',
  templateUrl: './product-admin-detail.component.html',
  styleUrls: ['./product-admin-detail.component.css']
})
export class ProductAdminDetailComponent {
  id: string = ''
  product = new Product() // product data to show
  errMessage: string = ''

  constructor(private _service: ProductApiService, private _router: Router, private _activeroute: ActivatedRoute) {
    this._activeroute.params.subscribe(params => {
      this.id = params['id'] //
      if (this.id != null){
        this.searchFashion(this.id) // get productselected
      } else {
        window.alert('Invalid product id to show')
        this._router.navigate(['/products'])
      }
    })
  }

  searchFashion(productId: string) {
    this._service.getProduct(productId).subscribe({
      next: (data) => { this.product = data },
      error: (err) => { this.errMessage = err },
    })
  }
  goBack() {
    this._router.navigate(['product-admin']);
  }
}
