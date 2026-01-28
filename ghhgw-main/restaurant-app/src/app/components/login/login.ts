import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  auth = inject(AuthService);
  email = ''; password = ''; isLogin = true;

  async submit() {
    try {
      if (this.isLogin) await this.auth.login(this.email, this.password);
      else await this.auth.register(this.email, this.password);
    } catch (e: any) { alert(e.message); }
  }
}
