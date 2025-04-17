import { Injectable } from '@angular/core';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private mockVideos: Video[] = [
    {
      id: '1',
      title: 'Tutoriel Angular 19',
      thumbnail: 'https://i.ytimg.com/vi/1.jpg',
      description: 'Apprenez les bases d\'Angular 19'
    },
    {
      id: '2',
      title: 'Les meilleures pratiques TypeScript',
      thumbnail: 'https://i.ytimg.com/vi/2.jpg',
      description: 'Découvrez les meilleures pratiques TypeScript'
    },
    {
      id: '3',
      title: 'Création d\'une API REST',
      thumbnail: 'https://i.ytimg.com/vi/3.jpg',
      description: 'Guide complet pour créer une API REST'
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
