import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Restaurant {
  private tableNumber$ = new BehaviorSubject<string>('');
  private numberOfPeople$ = new BehaviorSubject<number>(1);

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

  setPeople(count: number) {
    this.numberOfPeople$.next(count);
    localStorage.setItem('numberOfPeople', count.toString());
  }

  getPeople(): number {
    const stored = localStorage.getItem('numberOfPeople');
    if (stored && this.numberOfPeople$.value === 1) {
      this.numberOfPeople$.next(parseInt(stored));
    }
    return this.numberOfPeople$.value || parseInt(stored || '1');
  }

  getTable$() {
    return this.tableNumber$.asObservable();
  }

  getPeople$() {
    return this.numberOfPeople$.asObservable();
  }

  clearTable() {
    this.tableNumber$.next('');
    this.numberOfPeople$.next(1);
    localStorage.removeItem('tableNumber');
    localStorage.removeItem('numberOfPeople');
  }
}