import { Injectable } from '@angular/core';

export interface LocalVideo {
  id: string;
  title: string;
  description: string;
  file: File;
  thumbnailUrl: string;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalVideoService {
  private videos: LocalVideo[] = [];

  constructor() {
    // Charger les vidéos depuis le localStorage
    const storedVideos = localStorage.getItem('localVideos');
    if (storedVideos) {
      this.videos = JSON.parse(storedVideos);
    }
  }

  addVideo(video: LocalVideo): void {
    this.videos.push(video);
    this.saveVideos();
  }

  getVideos(): LocalVideo[] {
    return this.videos;
  }

  getVideoById(id: string): LocalVideo | undefined {
    return this.videos.find(video => video.id === id);
  }

  deleteVideo(id: string): void {
    this.videos = this.videos.filter(video => video.id !== id);
    this.saveVideos();
  }

  private saveVideos(): void {
    localStorage.setItem('localVideos', JSON.stringify(this.videos));
  }
}
