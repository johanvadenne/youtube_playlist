import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { LocalVideoService } from '../../services/local-video.service';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-container">
      <div class="video-player">
        <video *ngIf="video" controls autoplay>
          <source [src]="video.videoUrl" type="video/mp4">
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>
      <div class="video-info">
        <h1>{{ video?.title }}</h1>
        <p>{{ video?.description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .video-container {
      padding: 2rem;
    }
    .video-player {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    .video-player video {
      width: 100%;
      aspect-ratio: 16/9;
      background-color: #000;
    }
    .video-info {
      max-width: 800px;
      margin: 2rem auto;
    }
    .video-info h1 {
      margin: 0 0 1rem 0;
    }
    .video-info p {
      color: #666;
      line-height: 1.5;
    }
  `]
})
export class VideoComponent implements OnInit {
  video: any;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private localVideoService: LocalVideoService
  ) {}

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('id');
    if (videoId) {
      // Essayer d'abord de trouver la vidéo dans les vidéos locales
      this.video = this.localVideoService.getVideoById(videoId);

      // Si la vidéo n'est pas trouvée localement, chercher dans le service de vidéos
      if (!this.video) {
        this.video = this.videoService.getVideoById(videoId);
      }
    }
  }
}
