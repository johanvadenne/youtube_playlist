import { Injectable } from '@angular/core';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videos: Video[] = [];

  constructor() {
    const savedVideos = localStorage.getItem('videos');
    if (savedVideos) {
      this.videos = JSON.parse(savedVideos);
    }
  }

  getVideos(): Video[] {
    return this.videos;
  }

  getVideoById(id: string): Video | undefined {
    return this.videos.find(video => video.id === id);
  }

  addVideo(video: Video): void {
    this.videos.push(video);
    this.saveVideos();
  }

  deleteVideo(id: string): void {
    this.videos = this.videos.filter(video => video.id !== id);
    this.saveVideos();
  }

  private saveVideos(): void {
    localStorage.setItem('videos', JSON.stringify(this.videos));
  }
}
