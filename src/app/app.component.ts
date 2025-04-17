import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <app-header></app-header>
    <div class="main-container">
      <app-sidebar></app-sidebar>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .main-container {
      display: flex;
      min-height: calc(100vh - 60px);
    }
    .content {
      flex: 1;
      margin-left: 250px;
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  constructor(private authService: AuthService) {}
}
