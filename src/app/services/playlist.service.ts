import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

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

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlists: { [key: string]: Playlist[] } = {};

  constructor(private authService: AuthService) {
    // Charger les playlists depuis le localStorage
    const storedPlaylists = localStorage.getItem('playlists');
    if (storedPlaylists) {
      this.playlists = JSON.parse(storedPlaylists);
    }
  }

  getPlaylists(): Playlist[] {
    const user = this.authService.getCurrentUser();
    if (!user) return [];
    return this.playlists[user.email] || [];
  }

  createPlaylist(name: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    if (!this.playlists[user.email]) {
      this.playlists[user.email] = [];
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      videos: []
    };

    this.playlists[user.email].push(newPlaylist);
    this.savePlaylists();
  }

  addVideoToPlaylist(playlistId: string, video: Video): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const playlist = this.playlists[user.email]?.find(p => p.id === playlistId);
    if (playlist) {
      playlist.videos.push(video);
      this.savePlaylists();
    }
  }

  removeVideoFromPlaylist(playlistId: string, videoId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const playlist = this.playlists[user.email]?.find(p => p.id === playlistId);
    if (playlist) {
      playlist.videos = playlist.videos.filter(v => v.id !== videoId);
      this.savePlaylists();
    }
  }

  deletePlaylist(playlistId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.playlists[user.email] = this.playlists[user.email]?.filter(p => p.id !== playlistId) || [];
    this.savePlaylists();
  }

  private savePlaylists(): void {
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
  }
}
