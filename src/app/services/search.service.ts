import { Injectable } from '@angular/core';
import { Video } from './video.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private mockVideos: Video[] = [
    {
      id: '1',
      title: 'Tutoriel Angular 19',
      description: 'Apprenez les bases d\'Angular 19',
      videoUrl: 'https://example.com/video1.mp4',
      thumbnail: 'https://i.ytimg.com/vi/1.jpg',
      thumbnailUrl: 'https://i.ytimg.com/vi/1.jpg'
    },
    {
      id: '2',
      title: 'Les meilleures pratiques TypeScript',
      description: 'Découvrez les meilleures pratiques TypeScript',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnail: 'https://i.ytimg.com/vi/2.jpg',
      thumbnailUrl: 'https://i.ytimg.com/vi/2.jpg'
    },
    {
      id: '3',
      title: 'Création d\'une API REST',
      description: 'Guide complet pour créer une API REST',
      videoUrl: 'https://example.com/video3.mp4',
      thumbnail: 'https://i.ytimg.com/vi/3.jpg',
      thumbnailUrl: 'https://i.ytimg.com/vi/3.jpg'
    }
  ];

  search(query: string): Promise<Video[]> {
    // Simuler un délai de chargement
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = this.mockVideos.filter(video =>
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 500);
    });
  }

  getVideoById(id: string): Video | undefined {
    return this.mockVideos.find(video => video.id === id);
  }
}
