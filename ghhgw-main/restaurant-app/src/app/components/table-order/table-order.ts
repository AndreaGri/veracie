import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-order.html',
  styleUrl: './table-order.css'
})
export class TableOrderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  tableId = '';
  orders5620: Observable<any[]> | undefined;
  orders$: Observable<any[]> | undefined;

  ngOnInit() {
    this.tableId = this.route.snapshot.paramMap.get('tableId') || 'generale';
    this.orders$ = this.orderService.getOrdersByTable(this.tableId);
  }

  calcola(list: any[]): number {
    return list.reduce((a, b) => a + (b.totale || 0), 0);
  }
}
