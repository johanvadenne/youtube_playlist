import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideoService, Video } from '../../services/video.service';
import { LocalVideoService, LocalVideo } from '../../services/local-video.service';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-container" *ngIf="video">
      <video controls [src]="video.videoUrl" class="video-player"></video>
      <div class="video-info">
        <h1>{{ video.title }}</h1>
        <p>{{ video.description }}</p>
      </div>
    </div>
    <div *ngIf="error" class="error-message">
      {{ error }}
    </div>
  `,
  styles: [`
    .video-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .video-player {
      width: 100%;
      aspect-ratio: 16/9;
      background: #000;
    }
    .video-info {
      margin-top: 20px;
    }
    .error-message {
      color: red;
      text-align: center;
      margin-top: 20px;
    }
  `]
})
export class VideoComponent implements OnInit {
  video: Video | LocalVideo | undefined;
  error: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    private localVideoService: LocalVideoService
  ) {}

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('id');
    if (!videoId) {
      this.error = 'Aucun ID de vidéo spécifié';
      this.navigateToHome();
      return;
    }

    // Essayer d'abord de trouver la vidéo dans les vidéos locales
    this.video = this.localVideoService.getVideoById(videoId);

    // Si non trouvée, chercher dans les vidéos en ligne
    if (!this.video) {
      this.video = this.videoService.getVideoById(videoId);
    }

    if (!this.video) {
      this.error = 'Vidéo non trouvée';
      this.navigateToHome();
    }
  }

  private navigateToHome() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
