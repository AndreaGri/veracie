import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  // Usiamo user(this.auth) solo quando richiesto per evitare warning di injection
  user$ = user(this.auth);

  async login(email: string, pass: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, pass);
      this.redirect(email);
    } catch (e) { throw e; }
  }

  async register(email: string, pass: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, pass);
      this.redirect(email);
    } catch (e) { throw e; }
  }

  private redirect(email: string) {
    if (email === 'admin@admin.it') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/menu']);
    }
  }

  logout() {
    signOut(this.auth).then(() => this.router.navigate(['/login']));
  }
}
