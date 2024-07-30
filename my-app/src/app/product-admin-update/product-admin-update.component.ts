import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Products';
import { ProductApiService } from '../product-api.service';
import {AngularEditorConfig} from '@kolkov/angular-editor'
@Component({
  selector: 'app-product-admin-update',
  templateUrl: './product-admin-update.component.html',
  styleUrls: ['./product-admin-update.component.css']
})
export class ProductAdminUpdateComponent {
  product = new Product();
  products: any;
  errMessage: string = ''
  constructor(private _service: ProductApiService, private router: Router, private activateRoute: ActivatedRoute) {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchFashion(id);
      }
    });
  }
  public setProduct(f: Product) {
    this.product = f
  }
  searchFashion(Id: string) {
    this._service.getProduct(Id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  putProduct() {
    if(this.product && this.product._id) {
      this._service.putProduct(this.product._id, this.product).subscribe({
        next: (data) => { 
          this.products = data; 
          alert('Edit product success');
          this.goBack();
        },
        error: (err) => { 
          this.errMessage = err; 
          console.error('Error updating product:', err);
        }
      });
    } else {
      console.error('Product ID or data is missing');
    }
  }
  goBack() {
    this.router.navigate(['product-admin']);
  }
  onFileSelected(event: any, product: Product) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      product.img = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
   
  };
  
}
