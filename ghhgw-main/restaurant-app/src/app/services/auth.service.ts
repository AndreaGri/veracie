import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  user$ = user(this.auth);

  async login(email: string, pass: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, pass);
      return email;
    } catch (e) { throw e; }
  }

  async register(email: string, pass: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, pass);
      return email;
    } catch (e) { throw e; }
  }

  isAdmin(email: string): boolean {
    return email === 'admin@admin.it';
  }

  logout() {
    signOut(this.auth).then(() => this.router.navigate(['/login']));
  }
}