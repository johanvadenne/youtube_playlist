import { Injectable } from '@angular/core';
import { Video } from './video.service';

export interface LocalVideo extends Video {
  file: File;
  thumbnailFile: File | null;
}

@Injectable({
  providedIn: 'root'
})
export class LocalVideoService {
  private videos: LocalVideo[] = [];

  constructor() {
    this.loadVideos();
  }

  private loadVideos() {
    const savedVideos = localStorage.getItem('localVideos');
    if (savedVideos) {
      const parsedVideos = JSON.parse(savedVideos);
      this.videos = parsedVideos.map((video: any) => ({
        ...video,
        file: new File([], video.filePath),
        thumbnailFile: video.thumbnailPath ? new File([], video.thumbnailPath) : null
      }));
    }
  }

  addVideo(video: LocalVideo) {
    this.videos.push(video);
    this.saveVideos();
  }

  getVideos(): LocalVideo[] {
    return this.videos;
  }

  getVideoById(id: string): LocalVideo | undefined {
    return this.videos.find(video => video.id === id);
  }

  deleteVideo(id: string) {
    this.videos = this.videos.filter(video => video.id !== id);
    this.saveVideos();
  }

  private saveVideos() {
    const videosToSave = this.videos.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail,
      thumbnailUrl: video.thumbnailUrl,
      filePath: video.file.name,
      thumbnailPath: video.thumbnailFile?.name || null
    }));
    localStorage.setItem('localVideos', JSON.stringify(videosToSave));
  }
}
