import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="user-info" *ngIf="isLoggedIn">
        <h3>{{ username }}</h3>
      </div>
      <nav class="playlists">
        <h4>Mes playlists</h4>
        <ul>
          <li *ngFor="let playlist of playlists">
            <a routerLink="/playlist/{{playlist.id}}">{{ playlist.name }}</a>
          </li>
        </ul>
        <button *ngIf="isLoggedIn" (click)="createNewPlaylist()">+ Nouvelle playlist</button>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background-color: #f9f9f9;
      padding: 1rem;
      height: calc(100vh - 60px);
      position: fixed;
      left: 0;
      top: 60px;
    }
    .user-info {
      padding: 1rem 0;
      border-bottom: 1px solid #ddd;
    }
    .playlists {
      margin-top: 1rem;
    }
    .playlists h4 {
      margin-bottom: 0.5rem;
    }
    .playlists ul {
      list-style: none;
      padding: 0;
    }
    .playlists li {
      padding: 0.5rem 0;
    }
    .playlists a {
      text-decoration: none;
      color: #333;
    }
    .playlists button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class SidebarComponent {
  isLoggedIn = false;
  username = '';
  playlists: any[] = [];

  createNewPlaylist() {
    // TODO: Implémenter la création de playlist
  }
}
