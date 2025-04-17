import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <app-header></app-header>
    <div class="main-container">
      <app-sidebar></app-sidebar>
      <main class="content" [@routeAnimations]="getRouteAnimationData()">
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
      position: relative;
    }
  `],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  getRouteAnimationData() {
    return {
      value: 'routeAnimation',
      params: { depth: 1 }
    };
  }
}
