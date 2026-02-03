import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Restaurant } from '../../services/restaurant';

@Component({
  selector: 'app-table-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-order.html',
  styleUrl: './table-order.css'
})
export class TableOrderComponent implements OnInit {
  orderService = inject(OrderService);
  restaurant = inject(Restaurant);
  route = inject(ActivatedRoute);
  
  orders$ = this.orderService.getOrdersByTable('');
  tableId = '';
  numberOfPeople = 1;

  ngOnInit() {
    this.tableId = this.route.snapshot.paramMap.get('id') || '';
    this.numberOfPeople = this.restaurant.getPeople();
    this.orders$ = this.orderService.getOrdersByTable(this.tableId);
  }

  calcola(list: any[]): number {
    return list.reduce((sum, o) => sum + (o.totale || 0), 0);
  }

  quotaATesta(total: number): string {
    return (total / this.numberOfPeople).toFixed(2);
  }
}