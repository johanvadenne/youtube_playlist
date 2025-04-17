import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="logo">
        <a routerLink="/">YouTube Clone</a>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Rechercher des vidéos...">
        <button>Rechercher</button>
      </div>
      <div class="auth-buttons">
        <button *ngIf="!isLoggedIn" routerLink="/auth/login">Se connecter</button>
        <button *ngIf="!isLoggedIn" routerLink="/auth/register">S'inscrire</button>
        <button *ngIf="isLoggedIn" (click)="logout()">Se déconnecter</button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .logo a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #ff0000;
      text-decoration: none;
    }
    .search-bar {
      display: flex;
      gap: 0.5rem;
    }
    .search-bar input {
      padding: 0.5rem;
      width: 300px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .search-bar button {
      padding: 0.5rem 1rem;
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .auth-buttons {
      display: flex;
      gap: 1rem;
    }
    .auth-buttons button {
      padding: 0.5rem 1rem;
      background-color: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {
  isLoggedIn = false;

  logout() {
    // TODO: Implémenter la déconnexion
  }
}
