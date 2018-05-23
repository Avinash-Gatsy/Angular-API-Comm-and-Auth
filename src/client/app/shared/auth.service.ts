import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  storageKey = 'contact-manager-jwt';

  constructor(private router: Router) { }
  setToken(token: string) {
    // store the jwt in localStorage
    localStorage.setItem(this.storageKey, token);
  }
  getToken() {
    return localStorage.getItem(this.storageKey);
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    // delete the token and route to login screen
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }
}
