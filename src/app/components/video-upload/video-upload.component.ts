import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalVideo } from '../../services/local-video.service';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="upload-container">
      <form (ngSubmit)="onSubmit()" #uploadForm="ngForm">
        <div class="form-group">
          <label for="title">Titre de la vidéo</label>
          <input type="text" id="title" name="title" [(ngModel)]="title" required>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" name="description" [(ngModel)]="description"></textarea>
        </div>

        <div class="form-group">
          <label for="videoFile">Fichier vidéo</label>
          <input type="file" id="videoFile" name="videoFile" (change)="onVideoFileSelected($event)" accept="video/*" required>
          <div *ngIf="videoFile" class="preview">
            <video [src]="videoUrl" controls></video>
          </div>
        </div>

        <div class="form-group">
          <label for="thumbnailFile">Miniature (optionnelle)</label>
          <input type="file" id="thumbnailFile" name="thumbnailFile" (change)="onThumbnailFileSelected($event)" accept="image/*">
          <div *ngIf="thumbnailFile" class="preview">
            <img [src]="thumbnailUrl" alt="Aperçu de la miniature">
          </div>
        </div>

        <button type="submit" [disabled]="!uploadForm.valid">Télécharger</button>
      </form>
    </div>
  `,
  styles: [`
    .upload-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input[type="text"],
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .preview {
      margin-top: 10px;
    }
    .preview video,
    .preview img {
      max-width: 100%;
      max-height: 200px;
    }
    button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class VideoUploadComponent {
  @Output() videoUploaded = new EventEmitter<LocalVideo>();

  title = '';
  description = '';
  videoFile: File | null = null;
  thumbnailFile: File | null = null;
  videoUrl = '';
  thumbnailUrl = '';

  onVideoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.videoFile = input.files[0];
      this.videoUrl = URL.createObjectURL(this.videoFile);
    }
  }

  onThumbnailFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.thumbnailFile = input.files[0];
      this.thumbnailUrl = URL.createObjectURL(this.thumbnailFile);
    }
  }

  onSubmit() {
    if (!this.videoFile) return;

    const video: LocalVideo = {
      id: Date.now().toString(),
      title: this.title,
      description: this.description,
      videoUrl: URL.createObjectURL(this.videoFile),
      thumbnail: this.thumbnailUrl || '',
      thumbnailUrl: this.thumbnailUrl || '',
      file: this.videoFile,
      thumbnailFile: this.thumbnailFile
    };

    this.videoUploaded.emit(video);
  }
}
