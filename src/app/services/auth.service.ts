import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    // Charger les utilisateurs depuis le localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    // Vérifier si un utilisateur est déjà connecté
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.next(JSON.parse(storedUser));
    }
  }

  register(username: string, email: string, password: string): boolean {
    // Vérifier si l'utilisateur existe déjà
    if (this.users.some(user => user.email === email)) {
      return false;
    }

    const newUser: User = { username, email, password };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }
}
