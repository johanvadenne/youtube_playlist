import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalVideoService } from '../../services/local-video.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-local-videos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="videos-container">
      <h2>Mes vidéos locales</h2>
      <div class="videos-grid" *ngIf="videos.length > 0; else noVideos">
        <div class="video-card" *ngFor="let video of videos">
          <div class="video-thumbnail">
            <img [src]="video.thumbnailUrl || 'assets/default-thumbnail.jpg'" [alt]="video.title">
          </div>
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
          </div>
          <div class="video-actions">
            <button [routerLink]="['/video', video.id]">Regarder</button>
            <button (click)="deleteVideo(video.id)">Supprimer</button>
          </div>
        </div>
      </div>
      <ng-template #noVideos>
        <p class="no-videos">Aucune vidéo locale trouvée.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .videos-container {
      padding: 2rem;
    }
    .videos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .video-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .video-thumbnail {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }
    .video-thumbnail img {
      width: 100%;
      height: 100%;
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
    }
    .video-actions {
      padding: 1rem;
      display: flex;
      gap: 1rem;
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
export class LocalVideosComponent implements OnInit {
  videos: any[] = [];

  constructor(private localVideoService: LocalVideoService) {}

  ngOnInit() {
    this.videos = this.localVideoService.getVideos();
  }

  deleteVideo(id: string) {
    this.localVideoService.deleteVideo(id);
    this.videos = this.localVideoService.getVideos();
  }
}
