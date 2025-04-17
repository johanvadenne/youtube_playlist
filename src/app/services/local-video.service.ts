import { Injectable } from '@angular/core';

export interface LocalVideo {
  id: string;
  title: string;
  description: string;
  file: File;
  thumbnailUrl: string;
  thumbnail: string;
  filePath: string;
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

    // Sauvegarder le fichier vidéo
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Ici, vous devrez implémenter la logique pour sauvegarder le fichier
        // dans le dossier public/assets/videos
        // Note: Cette partie nécessite une implémentation côté serveur
        console.log('Fichier vidéo à sauvegarder:', fileName);
      }
    };
    reader.readAsArrayBuffer(video.file);

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
      // Ici, vous devrez implémenter la logique pour supprimer le fichier vidéo
      // du dossier public/assets/videos
      console.log('Fichier vidéo à supprimer:', video.filePath);
    }
    this.videos = this.videos.filter(video => video.id !== id);
    this.saveVideos();
  }

  private saveVideos(): void {
    localStorage.setItem('localVideos', JSON.stringify(this.videos));
  }
}
