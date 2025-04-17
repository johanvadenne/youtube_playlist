import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoUploadComponent } from '../../components/video-upload/video-upload.component';
import { LocalVideoService, LocalVideo } from '../../services/local-video.service';
import { PlaylistService } from '../../services/playlist.service';
import { PlaylistSelectorComponent } from '../../components/playlist-selector/playlist-selector.component';
import { Video } from '../../interfaces/video.interface';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, VideoUploadComponent, PlaylistSelectorComponent],
  template: `
    <div class="upload-page">
      <app-video-upload (videoUploaded)="onVideoUploaded($event)"></app-video-upload>

      <app-playlist-selector
        [isOpen]="isPlaylistSelectorOpen"
        [video]="convertedVideo!"
        (closeModal)="closePlaylistSelector()"
        (playlistSelected)="onPlaylistSelected($event)">
      </app-playlist-selector>
    </div>
  `,
  styles: [`
    .upload-page {
      padding: 2rem;
    }
  `]
})
export class UploadComponent {
  isPlaylistSelectorOpen = false;
  selectedVideo: LocalVideo | null = null;
  convertedVideo: Video | null = null;

  constructor(
    private localVideoService: LocalVideoService,
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  onVideoUploaded(video: LocalVideo) {
    this.localVideoService.addVideo(video);
    this.selectedVideo = video;
    this.convertedVideo = {
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      description: video.description,
      publishedAt: new Date().toISOString(),
      channelTitle: 'Ma chaîne',
      viewCount: '0'
    };
    this.isPlaylistSelectorOpen = true;
  }

  closePlaylistSelector() {
    this.isPlaylistSelectorOpen = false;
    this.selectedVideo = null;
    this.convertedVideo = null;
    this.router.navigate(['/']);
  }

  onPlaylistSelected(playlistId: string) {
    if (this.selectedVideo) {
      this.playlistService.addVideoToPlaylist(playlistId, {
        id: this.selectedVideo.id,
        title: this.selectedVideo.title,
        thumbnail: this.selectedVideo.thumbnail
      });
      this.closePlaylistSelector();
    }
  }
}
