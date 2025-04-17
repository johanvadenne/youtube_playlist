import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SearchComponent } from './pages/search/search.component';
import { VideoComponent } from './pages/video/video.component';
import { UploadComponent } from './pages/upload/upload.component';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: AuthComponent },
      { path: 'register', component: AuthComponent }
    ]
  },
  { path: 'search', component: SearchComponent },
  { path: 'video/:id', component: VideoComponent },
  { path: 'upload', component: UploadComponent }
];
