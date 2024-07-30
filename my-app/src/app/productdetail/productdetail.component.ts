import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Products';
import { ClientProductService } from '../Client-product.service';
import { CartService } from '../cart.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent {
  product = new Product() 
  id: string = '' 
  errMessage: string = ''
  private destroy$: Subject<void> = new Subject<void>();
  private addToCartSubject: Subject<Product> = new Subject<Product>();
  constructor(private _service: ClientProductService, 
    private _router: Router, 
    private _activeroute: ActivatedRoute,
    private cartService: CartService ) {
    this._activeroute.params.subscribe(params => {
      this.id = params['id'] //
      if (this.id != null){
        this.searchProduct(this.id) // get fashionselected
      } else {
        window.alert('Invalid fashion id to show')
        this._router.navigate(['/catalog'])
      }
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  } 
  ngOnInit():void{

  // Example of debouncing the addToCart event using RxJS
  this.addToCartSubject.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe((product) => {
    this.handleAddToCart(product);
  });
}
    
  goBack() {
    this._router.navigate(['catalog']);
  }
  searchProduct(productId: string) {
    this._service.getProduct(productId).subscribe({
      next: (data) => { this.product = data },
      error: (err) => { this.errMessage = err },
    })
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
