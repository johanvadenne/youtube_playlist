import { Injectable } from '@angular/core';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  viewCount: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor() {}
}
