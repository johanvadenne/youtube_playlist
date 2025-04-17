import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-container">
      <div class="video-player">
        <img [src]="video?.thumbnail" [alt]="video?.title">
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
    .video-player img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
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
  video: Video | undefined;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('id');
    if (videoId) {
      this.video = this.searchService.getVideoById(videoId);
    }
  }
}
