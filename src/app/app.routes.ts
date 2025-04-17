import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SearchComponent } from './pages/search/search.component';
import { VideoComponent } from './pages/video/video.component';
import { UploadComponent } from './pages/upload/upload.component';
import { LocalVideosComponent } from './pages/local-videos/local-videos.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { PlaylistDetailComponent } from './pages/playlist-detail/playlist-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AuthComponent },
      { path: 'register', component: AuthComponent }
    ]
  },
  { path: 'search', component: SearchComponent },
  { path: 'video/:id', component: VideoComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'local-videos', component: LocalVideosComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'playlist/:id', component: PlaylistDetailComponent }
];
