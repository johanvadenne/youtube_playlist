import { Injectable } from '@angular/core';

export interface LocalVideo {
  id: string;
  title: string;
  description: string;
  file: File;
  thumbnailUrl: string;
  thumbnail: string;
  filePath: string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalVideoService {
  private videos: LocalVideo[] = [];
  private readonly VIDEOS_DIR = '/assets/videos/';

  constructor() {
    // Charger les vidéos depuis le localStorage
    const storedVideos = localStorage.getItem('localVideos');
    if (storedVideos) {
      this.videos = JSON.parse(storedVideos);
    }
  }

  addVideo(video: LocalVideo): void {
    // Générer un nom de fichier unique
    const fileName = `${Date.now()}-${video.file.name}`;
    video.filePath = this.VIDEOS_DIR + fileName;

    // Créer une URL pour la vidéo
    video.videoUrl = URL.createObjectURL(video.file);

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
    const video = this.videos.find(v => v.id === id);
    if (video) {
      // Libérer l'URL de la vidéo
      URL.revokeObjectURL(video.videoUrl);
      if (video.thumbnailUrl) {
        URL.revokeObjectURL(video.thumbnailUrl);
      }
    }
    this.videos = this.videos.filter(video => video.id !== id);
    this.saveVideos();
  }

  private saveVideos(): void {
    localStorage.setItem('localVideos', JSON.stringify(this.videos));
  }
}
