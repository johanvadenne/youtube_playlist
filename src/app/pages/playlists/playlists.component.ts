import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="playlists-container">
      <h2>Mes playlists</h2>
      <div class="playlists-grid" *ngIf="playlists.length > 0; else noPlaylists">
        <div class="playlist-card" *ngFor="let playlist of playlists">
          <div class="playlist-info">
            <h3>{{ playlist.name }}</h3>
            <p>{{ playlist.videos.length }} vidéos</p>
          </div>
          <div class="playlist-actions">
            <button [routerLink]="['/playlist', playlist.id]">Voir les vidéos</button>
            <button (click)="deletePlaylist(playlist.id)">Supprimer</button>
          </div>
        </div>
      </div>
      <ng-template #noPlaylists>
        <p class="no-playlists">Aucune playlist trouvée.</p>
      </ng-template>
      <button class="create-playlist" (click)="createPlaylist()">Créer une playlist</button>
    </div>
  `,
  styles: [`
    .playlists-container {
      padding: 2rem;
    }
    .playlists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .playlist-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem;
    }
    .playlist-info {
      margin-bottom: 1rem;
    }
    .playlist-info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }
    .playlist-info p {
      margin: 0;
      color: #666;
    }
    .playlist-actions {
      display: flex;
      gap: 1rem;
    }
    .playlist-actions button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .playlist-actions button:first-child {
      background-color: #ff0000;
      color: white;
    }
    .playlist-actions button:last-child {
      background-color: #f0f0f0;
      color: #333;
    }
    .no-playlists {
      text-align: center;
      color: #666;
      margin-top: 2rem;
    }
    .create-playlist {
      display: block;
      width: 200px;
      margin: 2rem auto;
      padding: 0.75rem;
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class PlaylistsComponent implements OnInit {
  playlists: any[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
  }

  deletePlaylist(id: string) {
    this.playlistService.deletePlaylist(id);
    this.playlists = this.playlistService.getPlaylists();
  }

  createPlaylist() {
    const name = prompt('Nom de la playlist :');
    if (name) {
      this.playlistService.createPlaylist(name);
      this.playlists = this.playlistService.getPlaylists();
    }
  }
}
