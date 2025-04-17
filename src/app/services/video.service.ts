import { Injectable } from '@angular/core';

export interface BaseVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

export interface Video extends BaseVideo {
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videos: Video[] = [
    {
      id: '1',
      title: 'Introduction à Angular',
      description: 'Une introduction complète au framework Angular',
      videoUrl: 'https://example.com/video1.mp4',
      thumbnail: 'https://example.com/thumb1.jpg',
      thumbnailUrl: 'https://example.com/thumb1.jpg'
    },
    {
      id: '2',
      title: 'Les bases de TypeScript',
      description: 'Apprenez les fondamentaux de TypeScript',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnail: 'https://example.com/thumb2.jpg',
      thumbnailUrl: 'https://example.com/thumb2.jpg'
    }
  ];

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
