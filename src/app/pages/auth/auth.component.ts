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
      <h2>{{ isLogin ? 'Connexion' : 'Inscription' }}</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>
        <div *ngIf="!isLogin" class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <input type="password" id="confirmPassword" [(ngModel)]="confirmPassword" name="confirmPassword" required>
        </div>
        <button type="submit">{{ isLogin ? 'Se connecter' : 'S\'inscrire' }}</button>
        <button type="button" (click)="toggleForm()">
          {{ isLogin ? 'Créer un compte' : 'Déjà un compte ?' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
      margin-top: 1rem;
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="button"] {
      background-color: #f0f0f0;
      color: #333;
    }
  `]
})
export class AuthComponent implements OnInit {
  isLogin = true;
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.isLogin = url[0]?.path === 'login';
    });
  }

  toggleForm() {
    const newPath = this.isLogin ? 'register' : 'login';
    this.router.navigate(['/auth', newPath]);
  }

  onSubmit() {
    if (this.isLogin) {
      if (this.authService.login(this.email, this.password)) {
        this.router.navigate(['/']);
      } else {
        alert('Email ou mot de passe incorrect');
      }
    } else {
      if (this.authService.register(this.email, this.password, this.confirmPassword)) {
        this.router.navigate(['/']);
      } else {
        alert('Cet email est déjà utilisé');
      }
    }
  }
}
