import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface Playlist {
  id: string;
  name: string;
  videos: Video[];
}

@Component({
  selector: 'app-playlist-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen">
      <div class="modal">
        <div class="modal-header">
          <h2>Ajouter à une playlist</h2>
          <button class="close-button" (click)="close()">×</button>
        </div>
        <div class="modal-content">
          <div class="playlist-list">
            <div class="playlist-item" *ngFor="let playlist of playlists">
              <input type="radio"
                     [id]="'playlist-' + playlist.id"
                     [name]="'playlist-select'"
                     [value]="playlist.id"
                     [(ngModel)]="selectedPlaylistId">
              <label [for]="'playlist-' + playlist.id">{{ playlist.name }}</label>
            </div>
          </div>
          <div class="new-playlist">
            <input type="text"
                   [(ngModel)]="newPlaylistName"
                   placeholder="Nom de la nouvelle playlist"
                   (keyup.enter)="createAndSelectPlaylist()">
            <button (click)="createAndSelectPlaylist()">Créer</button>
          </div>
        </div>
        <div class="modal-footer">
          <button (click)="close()">Annuler</button>
          <button (click)="confirm()" [disabled]="!selectedPlaylistId">Confirmer</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }
    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .modal-content {
      padding: 1rem;
      overflow-y: auto;
    }
    .playlist-list {
      margin-bottom: 1rem;
    }
    .playlist-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
    }
    .playlist-item input {
      margin-right: 0.5rem;
    }
    .new-playlist {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .new-playlist input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .modal-footer {
      padding: 1rem;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    button:not(:disabled) {
      background-color: #ff0000;
      color: white;
    }
  `]
})
export class PlaylistSelectorComponent {
  @Input() isOpen = false;
  @Input() video!: Video;
  @Output() closeModal = new EventEmitter<void>();
  @Output() playlistSelected = new EventEmitter<string>();

  playlists: Playlist[] = [];
  selectedPlaylistId: string | null = null;
  newPlaylistName = '';

  constructor(private playlistService: PlaylistService) {
    this.playlists = this.playlistService.getPlaylists();
  }

  close() {
    this.closeModal.emit();
  }

  confirm() {
    if (this.selectedPlaylistId) {
      this.playlistSelected.emit(this.selectedPlaylistId);
      this.close();
    }
  }

  createAndSelectPlaylist() {
    if (this.newPlaylistName.trim()) {
      this.playlistService.createPlaylist(this.newPlaylistName);
      this.playlists = this.playlistService.getPlaylists();
      const newPlaylist = this.playlists[this.playlists.length - 1];
      this.selectedPlaylistId = newPlaylist.id;
      this.newPlaylistName = '';
    }
  }
}
