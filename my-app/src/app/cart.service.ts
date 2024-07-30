import { Injectable } from '@angular/core';
import { Product} from './Products';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService{
  private storageKey = 'cartItems';
  private items: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
// Add new BehaviorSubjects for subtotal and total items
private subtotalSubject = new BehaviorSubject<number>(0);
subtotal$ = this.subtotalSubject.asObservable();

private totalCountSubject = new BehaviorSubject<number>(0);
totalCount$ = this.totalCountSubject.asObservable();
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
     // Lắng nghe sự kiện storage
     window.addEventListener('storage', (event) => {
      if (event.key === this.storageKey) {
        console.log('LocalStorage updated from another tab or window.');
        this.loadFromLocalStorage(); // Tải lại dữ liệu từ localStorage
      }
    });
  }

  private loadFromLocalStorage() {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.emitCartItems();
    }
  }

  private saveToLocalStorage() {
    console.log('Saving to localStorage:', this.items);
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
  private emitCartItems() {
    this.cartItemsSubject.next([...this.items]);
  }
  // Update calculations whenever the cart items change
  public updateCalculations() {
  const subtotal = this.calculateTotal();
  const totalCount = this.items.reduce((count, item) => count + item.quantity, 0);

  this.subtotalSubject.next(subtotal);
  this.totalCountSubject.next(totalCount);
}

  addItem(item: Product): void {
    const existingItem = this.items.find((product) => product._id === item._id);
    if (existingItem) {
      // Cập nhật số lượng cho mặt hàng hiện có
      existingItem.quantity += 1;
    } else {
      // Thêm mặt hàng mới với số lượng mặc định là 1
      const newItem = { ...item, quantity: 1 };
      this.items.push(newItem);
    }
    console.log('Adding item:', item);
    this.saveToLocalStorage();
    this.emitCartItems();
  }
  
  removeItem(itemId: string): void {
    console.log('Removing item with id:', itemId);
    this.items = this.items.filter((item) => item._id !== itemId);
    console.log('Updated items after removal:', this.items);
    this.saveToLocalStorage();
    this.emitCartItems();
  }

  calculateTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart(): void {
    this.items = [];
    this.emitCartItems();
    this.saveToLocalStorage();
  }

}