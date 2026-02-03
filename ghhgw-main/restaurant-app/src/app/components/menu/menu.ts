import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Restaurant } from '../../services/restaurant';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent implements OnInit {
  orderService = inject(OrderService);
  restaurant = inject(Restaurant);
  router = inject(Router);
  
  piatti = [
    {nome: 'Insalata', prezzo: 8}, 
    {nome: 'Pizza', prezzo: 10}, 
    {nome: 'Pasta', prezzo: 9}
  ];
  carrello: any[] = [];
  tableNumber = '';

  ngOnInit() {
    this.tableNumber = this.restaurant.getTable();
    
    if (!this.tableNumber) {
      alert('Seleziona prima il tavolo!');
      this.router.navigate(['/login']);
    }
  }

  add(p: any) { 
    this.carrello.push(p); 
  }

  async invia() {
    await this.orderService.sendOrder(this.carrello, this.tableNumber);
    alert(`Ordine inviato al ${this.tableNumber}!`);
    this.carrello = [];
  }
}