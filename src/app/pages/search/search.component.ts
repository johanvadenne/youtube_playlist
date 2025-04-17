import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { PlaylistService } from '../../services/playlist.service';
import { PlaylistSelectorComponent } from '../../components/playlist-selector/playlist-selector.component';
import { Video } from '../../services/video.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, PlaylistSelectorComponent],
  template: `
    <div class="search-container">
      <div class="search-bar">
        <input type="text" [(ngModel)]="searchQuery" placeholder="Rechercher des vidéos...">
        <button (click)="onSearch()">Rechercher</button>
      </div>

      <div class="loading" *ngIf="isLoading">
        Chargement...
      </div>

      <div class="results" *ngIf="!isLoading">
        <div class="video-card" *ngFor="let video of searchResults">
          <img [src]="video.thumbnail" [alt]="video.title">
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
            <div class="actions">
              <button (click)="openPlaylistSelector(video)">Ajouter à une playlist</button>
            </div>
          </div>
        </div>

        <div class="no-results" *ngIf="searchResults.length === 0">
          Aucun résultat trouvé
        </div>
      </div>

      <app-playlist-selector
        [isOpen]="isPlaylistSelectorOpen"
        [video]="selectedVideo!"
        (closeModal)="closePlaylistSelector()"
        (playlistSelected)="onPlaylistSelected($event)">
      </app-playlist-selector>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 2rem;
    }
    .search-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .search-bar input {
      flex: 1;
      padding: 0.5rem;
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
    .loading {
      text-align: center;
      padding: 2rem;
    }
    .results {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .video-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .video-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .video-info {
      padding: 1rem;
    }
    .video-info h3 {
      margin: 0 0 0.5rem 0;
    }
    .video-info p {
      color: #666;
      margin: 0 0 1rem 0;
    }
    .actions button {
      width: 100%;
      padding: 0.5rem;
      background-color: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .no-results {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  `]
})
export class SearchComponent {
  searchQuery = '';
  searchResults: Video[] = [];
  isLoading = false;
  isPlaylistSelectorOpen = false;
  selectedVideo: Video | null = null;

  constructor(
    private searchService: SearchService,
    private playlistService: PlaylistService
  ) {}

  onSearch() {
    if (!this.searchQuery.trim()) return;

    this.isLoading = true;
    this.searchService.search(this.searchQuery)
      .then(results => {
        this.searchResults = results;
        this.isLoading = false;
      });
  }

  openPlaylistSelector(video: Video) {
    this.selectedVideo = video;
    this.isPlaylistSelectorOpen = true;
  }

  closePlaylistSelector() {
    this.isPlaylistSelectorOpen = false;
    this.selectedVideo = null;
  }

  onPlaylistSelected(playlistId: string) {
    if (this.selectedVideo) {
      this.playlistService.addVideoToPlaylist(playlistId, this.selectedVideo);
      this.closePlaylistSelector();
    }
  }
}
