import { Component,OnInit } from '@angular/core';
import { Product } from '../Products';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: Product[] = [];

  constructor(private cartService: CartService,
    
    private router: Router // Inject the Router
    ) {}

  ngOnInit() {
    this.loadCartItems();
    

  }

  loadCartItems() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(item: Product) {
    this.cartService.removeItem(item._id);
    // Không cần gọi loadCartItems() vì cartItems$ sẽ tự động cập nhật
  }

  clearCart() {
    this.cartService.clearCart();
  }

  get total() {
    return this.cartService.calculateTotal();
  }
  
  proceedToCheckout() {
    this.router.navigate(['/check']); // Navigate to the checkout page
  }
}

