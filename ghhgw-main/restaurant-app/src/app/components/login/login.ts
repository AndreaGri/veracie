import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Restaurant } from '../../services/restaurant';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  restaurant = inject(Restaurant);
  
  email = ''; 
  password = ''; 
  isLogin = true;
  
  showTableInput = false;
  tableNumber = '';
  currentEmail = '';

  async submit() {
    try {
      if (this.isLogin) {
        this.currentEmail = await this.auth.login(this.email, this.password);
      } else {
        this.currentEmail = await this.auth.register(this.email, this.password);
      }
      
      if (this.auth.isAdmin(this.currentEmail)) {
        this.router.navigate(['/admin']);
      } else {
        this.showTableInput = true;
      }
    } catch (e: any) { 
      alert(e.message); 
    }
  }

  goToMenu() {
    if (!this.tableNumber.trim()) {
      alert('Inserisci il numero del tavolo!');
      return;
    }
    
    this.restaurant.setTable(this.tableNumber);
    this.router.navigate(['/menu']);
  }
}