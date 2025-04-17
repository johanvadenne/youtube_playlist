import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-form">
        <h2>{{ isLogin ? 'Connexion' : 'Inscription' }}</h2>
        <form (ngSubmit)="onSubmit()">
          <div *ngIf="!isLogin" class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" [(ngModel)]="username" name="username" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" [(ngModel)]="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" [(ngModel)]="password" name="password" required>
          </div>
          <button type="submit">{{ isLogin ? 'Se connecter' : 'S\'inscrire' }}</button>
        </form>
        <p class="switch-form">
          {{ isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?' }}
          <button (click)="toggleForm()">{{ isLogin ? 'S\'inscrire' : 'Se connecter' }}</button>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    .auth-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
    .switch-form {
      text-align: center;
      margin-top: 1rem;
    }
    .switch-form button {
      background: none;
      color: #ff0000;
      text-decoration: underline;
      padding: 0;
      margin: 0;
      width: auto;
    }
  `]
})
export class AuthComponent implements OnInit {
  isLogin = true;
  username = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Déterminer le mode en fonction de l'URL
    this.route.url.subscribe(url => {
      this.isLogin = url[0]?.path === 'login';
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.router.navigate([this.isLogin ? 'login' : 'register'], { relativeTo: this.route.parent });
  }

  onSubmit() {
    if (this.isLogin) {
      if (this.authService.login(this.email, this.password)) {
        this.router.navigate(['/']);
      } else {
        alert('Email ou mot de passe incorrect');
      }
    } else {
      if (this.authService.register(this.username, this.email, this.password)) {
        this.router.navigate(['/']);
      } else {
        alert('Cet email est déjà utilisé');
      }
    }
  }
}
