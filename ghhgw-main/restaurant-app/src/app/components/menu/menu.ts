import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  orderService = inject(OrderService);
  piatti = [{nome: 'Insalata', prezzo: 8}, {nome: 'Pizza', prezzo: 10}, {nome: 'Pasta', prezzo: 9}];
  carrello: any[] = [];

  add(p: any) { this.carrello.push(p); }

  async invia() {
    await this.orderService.sendOrder(this.carrello, 'tavolo-1');
    alert('Ordine inviato!');
    this.carrello = [];
  }
}
