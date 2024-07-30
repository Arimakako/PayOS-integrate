import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  order: any;  // Replace 'any' with your order model
  loading = false;
  error: string | null = null;
  searchTerm: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  searchOrder(): void {
    if (!this.searchTerm.trim()) {
      this.error = "Please enter a valid order ID.";
      return;
    }

    this.loading = true;
    this.orderService.getOrderDetails(this.searchTerm).subscribe({
      next: (data) => {
        this.order = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching order:', err);
        this.error = 'Failed to load order details.';
        this.loading = false;
      }
    });
  }
}
