import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="playlist-detail-container">
      <div class="playlist-header">
        <h2>{{ playlist?.name }}</h2>
        <p>{{ playlist?.videos.length }} vidéos</p>
      </div>
      <div class="videos-grid" *ngIf="playlist?.videos.length > 0; else noVideos">
        <div class="video-card" *ngFor="let video of playlist?.videos">
          <div class="video-thumbnail">
            <img [src]="video.thumbnail" [alt]="video.title">
          </div>
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
          </div>
          <div class="video-actions">
            <button [routerLink]="['/video', video.id]">Regarder</button>
            <button (click)="removeFromPlaylist(video.id)">Retirer</button>
          </div>
        </div>
      </div>
      <ng-template #noVideos>
        <p class="no-videos">Aucune vidéo dans cette playlist.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .playlist-detail-container {
      padding: 2rem;
    }
    .playlist-header {
      margin-bottom: 2rem;
    }
    .playlist-header h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }
    .playlist-header p {
      margin: 0;
      color: #666;
    }
    .videos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .video-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .video-thumbnail img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .video-info {
      padding: 1rem;
    }
    .video-info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }
    .video-info p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
    .video-actions {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-top: 1px solid #eee;
    }
    .video-actions button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .video-actions button:first-child {
      background-color: #ff0000;
      color: white;
    }
    .video-actions button:last-child {
      background-color: #f0f0f0;
      color: #333;
    }
    .no-videos {
      text-align: center;
      color: #666;
      margin-top: 2rem;
    }
  `]
})
export class PlaylistDetailComponent implements OnInit {
  playlist: any;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.playlist = this.playlistService.getPlaylistById(playlistId);
      console.log('Playlist chargée:', this.playlist);
    }
  }

  removeFromPlaylist(videoId: string) {
    if (this.playlist) {
      this.playlistService.removeVideoFromPlaylist(this.playlist.id, videoId);
      this.playlist = this.playlistService.getPlaylistById(this.playlist.id);
    }
  }
}
