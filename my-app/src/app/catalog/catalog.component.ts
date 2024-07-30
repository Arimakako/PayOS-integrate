
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ClientProductService} from '../Client-product.service';
import { Product } from '../Products';
import { CartService } from '../cart.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: any;
  cate: string ='';
  productcateunique: string[] = [];
  page: number = 1;
  count: number =0;
  tableSize: number=9;
  tableSizes: any = [5,10,15,20];
  errMessage: string = ''
  lowerPrice: number = 0;
  upperPrice: number = 99999999;
  selectedCates: string[] = [];
  selectedPetTypes: string[] = [];
  pettypeunique: string[] = []; // Assuming this gets populated somewhere
  
  private destroy$: Subject<void> = new Subject<void>();
  private addToCartSubject: Subject<Product> = new Subject<Product>();
  constructor(
    public _service: ClientProductService, 
    private _router: Router, 
    private _activeRoute: ActivatedRoute,
    private cartService: CartService  // Inject the CartService
  )  {
    this.getProducts()
    this.page = 1
    
}


ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
  ngOnInit():void{
    this.getProducts();
    this.readQueryParams();
    this.applyFilters();
  this.getFilteredProducts();

  // Example of debouncing the addToCart event using RxJS
  this.addToCartSubject.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe((product) => {
    this.handleAddToCart(product);
  });
}



  detailProduct(_id: string) {
    this._router.navigate(['catalog/productdetail', _id])
  }
  onChange(e: any): void{
      if (e)
        this.page = e;
  }
  getProducts() {
    this._service.getProducts().subscribe((response)=>
    {
      this.products=response;
      console.log(this.products)
    })
  }
  readQueryParams() {
    this._activeRoute.queryParams.subscribe(params => {
      this.lowerPrice = +params['lowerPrice'] || this.lowerPrice;
      this.upperPrice = +params['upperPrice'] || this.upperPrice;
      this.selectedCates = params['cate'] ? params['cate'].split('') : this.selectedCates;
      this.selectedPetTypes = params['pettype'] ? params['pettype'].join('') : this.selectedPetTypes;
      // Call the applyFilters function whenever query params change
      this.applyFilters();
    });
  }

  getFilteredProducts() {
    const selectedCatesString = this.selectedCates.join('');
    const selectedPetTypesString = this.selectedPetTypes.join('');
    this._service.getProductsFiltered(this.lowerPrice, this.upperPrice, selectedCatesString, selectedPetTypesString, '')
      .subscribe(
        products => {
          this.products = products;
        },
        error => {
          this.errMessage = error.message;
        }
      );
  }

  applyFilters() {
    console.log(`Applying filters with lowerPrice: ${this.lowerPrice}, upperPrice: ${this.upperPrice}, selectedCates: ${this.selectedCates}, selectedPetTypes: ${this.selectedPetTypes}`);
    this.getFilteredProducts();
  }

  sortPrice(order: 'asc' | 'desc') {
    console.log(`Sorting price in order: ${order}`);
    const selectedCatesString = this.selectedCates.join('');
    const selectedPetTypesString = this.selectedPetTypes.join('');
    this._service.getProductsFiltered(this.lowerPrice, this.upperPrice, selectedCatesString, selectedPetTypesString, order)
      .subscribe(
        products => {
          this.products = products;
        },
        error => {
          this.errMessage = error.message;
        }
      );
  }


addToCart(product: Product) {
  if (product.quantity < 0) {
    alert('Invalid quantity');
    return;
  }

  alert('Your product has been added to the cart!');
  this.addToCartSubject.next(product);
}

handleAddToCart(product: Product) {
  this.cartService.addItem(product);
  console.log(product);
}

}

