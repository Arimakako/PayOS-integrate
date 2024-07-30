import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:9992/orders'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Method to place a new order
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, orderData);
  }

  // Method to get order details by ID for tracking
  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }
}
