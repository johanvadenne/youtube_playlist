import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoUploadComponent } from '../../components/video-upload/video-upload.component';
import { LocalVideoService, LocalVideo } from '../../services/local-video.service';
import { PlaylistService } from '../../services/playlist.service';
import { PlaylistSelectorComponent } from '../../components/playlist-selector/playlist-selector.component';
import { Video } from '../../services/video.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, VideoUploadComponent, PlaylistSelectorComponent],
  template: `
    <div class="upload-page">
      <h1>Ajouter une vidéo</h1>
      <app-video-upload (videoUploaded)="onVideoUploaded($event)"></app-video-upload>
      <app-playlist-selector
        *ngIf="isPlaylistSelectorOpen"
        [isOpen]="isPlaylistSelectorOpen"
        [video]="selectedVideo!"
        (close)="closePlaylistSelector()"
        (playlistSelected)="onPlaylistSelected($event)"
      ></app-playlist-selector>
    </div>
  `,
  styles: [`
    .upload-page {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      margin-bottom: 20px;
    }
  `]
})
export class UploadComponent {
  isPlaylistSelectorOpen = false;
  selectedVideo: Video | null = null;

  constructor(
    private router: Router,
    private localVideoService: LocalVideoService,
    private playlistService: PlaylistService
  ) {}

  onVideoUploaded(video: LocalVideo) {
    this.localVideoService.addVideo(video);
    this.selectedVideo = {
      id: video.id,
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnailUrl || '',
      thumbnailUrl: video.thumbnailUrl || ''
    };
    this.isPlaylistSelectorOpen = true;
  }

  closePlaylistSelector() {
    this.isPlaylistSelectorOpen = false;
    this.router.navigate(['/']);
  }

  onPlaylistSelected(playlistId: string) {
    if (this.selectedVideo) {
      this.playlistService.addVideoToPlaylist(playlistId, this.selectedVideo);
    }
    this.closePlaylistSelector();
  }
}
