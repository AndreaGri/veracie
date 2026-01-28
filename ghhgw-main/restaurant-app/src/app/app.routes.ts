import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { MenuComponent } from './components/menu/menu';
import { TableOrderComponent } from './components/table-order/table-order';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'table/:tableId', component: TableOrderComponent },
  { path: 'admin', component: AdminDashboard }
];
