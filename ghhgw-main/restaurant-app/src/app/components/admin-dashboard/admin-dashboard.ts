import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  private orderService = inject(OrderService);
  auth = inject(AuthService);
  orders$: Observable<any[]> = this.orderService.getAdminOrders();

  aggiorna(id: string, s: string) {
    this.orderService.updateStatus(id, s);
  }
}
