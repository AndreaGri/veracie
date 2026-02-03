import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Restaurant {
  private tableNumber$ = new BehaviorSubject<string>('');

  setTable(table: string) {
    this.tableNumber$.next(table);
    localStorage.setItem('tableNumber', table);
  }

  getTable(): string {
    const stored = localStorage.getItem('tableNumber');
    if (stored && !this.tableNumber$.value) {
      this.tableNumber$.next(stored);
    }
    return this.tableNumber$.value || stored || '';
  }

  getTable$() {
    return this.tableNumber$.asObservable();
  }

  clearTable() {
    this.tableNumber$.next('');
    localStorage.removeItem('tableNumber');
  }
}