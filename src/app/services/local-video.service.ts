import { Injectable } from '@angular/core';
import { BaseVideo } from './video.service';

export interface LocalVideo extends Omit<BaseVideo, 'thumbnail'> {
  file: File;
  thumbnail?: File;
  filePath?: string;
  thumbnailUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalVideoService {
  private videos: LocalVideo[] = [];
  private readonly DEFAULT_THUMBNAIL = '/assets/default-thumbnail.svg';

  constructor() {
    this.loadVideos();
  }

  private loadVideos() {
    const savedVideos = localStorage.getItem('localVideos');
    if (savedVideos) {
      const parsedVideos = JSON.parse(savedVideos);
      this.videos = parsedVideos.map((video: any) => {
        // Recréer les URLs blob pour les fichiers
        const videoUrl = video.file ? URL.createObjectURL(new Blob([video.file])) : '';
        const thumbnailUrl = video.thumbnail ? URL.createObjectURL(new Blob([video.thumbnail])) : this.DEFAULT_THUMBNAIL;

        return {
          ...video,
          videoUrl,
          thumbnailUrl
        };
      });
    }
  }

  addVideo(video: LocalVideo) {
    // Créer des URLs blob pour la vidéo et la miniature
    const videoUrl = URL.createObjectURL(video.file);
    const thumbnailUrl = video.thumbnail ? URL.createObjectURL(video.thumbnail) : this.DEFAULT_THUMBNAIL;

    const newVideo: LocalVideo = {
      ...video,
      videoUrl,
      thumbnailUrl
    };

    this.videos.push(newVideo);
    this.saveVideos();
  }

  getVideos(): LocalVideo[] {
    return this.videos;
  }

  getVideoById(id: string): LocalVideo | undefined {
    return this.videos.find(video => video.id === id);
  }

  deleteVideo(id: string) {
    const video = this.getVideoById(id);
    if (video) {
      // Libérer les URLs blob
      if (video.videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(video.videoUrl);
      }
      if (video.thumbnailUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(video.thumbnailUrl);
      }

      this.videos = this.videos.filter(v => v.id !== id);
      this.saveVideos();
    }
  }

  private saveVideos() {
    // Ne pas sauvegarder les URLs blob dans le localStorage
    const videosToSave = this.videos.map(video => ({
      ...video,
      videoUrl: undefined,
      thumbnailUrl: undefined,
      file: video.file,
      thumbnail: video.thumbnail
    }));
    localStorage.setItem('localVideos', JSON.stringify(videosToSave));
  }
}
