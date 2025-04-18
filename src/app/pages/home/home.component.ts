import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { LocalVideoService, LocalVideo } from '../../services/local-video.service';
import { Video } from '../../services/video.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playlists: any[] = [];
  localVideos: LocalVideo[] = [];

  constructor(
    private playlistService: PlaylistService,
    private localVideoService: LocalVideoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
    this.localVideos = this.localVideoService.getVideos();
  }

  getPlaylistThumbnail(playlist: any): string {
    if (playlist.videos.length > 0) {
      return playlist.videos[0].thumbnailUrl;
    }
    return '/assets/default-thumbnail.svg';
  }

  viewPlaylist(playlistId: string) {
    this.router.navigate(['/playlist', playlistId]);
  }

  playVideo(video: LocalVideo) {
    // TODO: Implémenter la lecture de la vidéo
    console.log('Lecture de la vidéo:', video);
  }
}
