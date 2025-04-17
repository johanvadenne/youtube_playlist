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
      <h2>Ajouter une vidéo locale</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" id="title" [(ngModel)]="title" name="title" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" [(ngModel)]="description" name="description" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="video">Fichier vidéo</label>
          <input type="file" id="video" (change)="onFileSelected($event)" accept="video/*" required>
        </div>
        <div class="form-group">
          <label for="thumbnail">Miniature (optionnel)</label>
          <input type="file" id="thumbnail" (change)="onThumbnailSelected($event)" accept="image/*">
        </div>
        <div class="preview" *ngIf="videoFile">
          <video [src]="videoUrl" controls></video>
          <img *ngIf="thumbnailUrl" [src]="thumbnailUrl" alt="Miniature">
        </div>
        <button type="submit" [disabled]="!isFormValid()">Ajouter la vidéo</button>
      </form>
    </div>
  `,
  styles: [`
    .upload-container {
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input[type="text"],
    textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    input[type="file"] {
      width: 100%;
      padding: 0.5rem;
    }
    .preview {
      margin: 1rem 0;
    }
    .preview video,
    .preview img {
      max-width: 100%;
      max-height: 200px;
      margin: 0.5rem 0;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class VideoUploadComponent {
  title = '';
  description = '';
  videoFile: File | null = null;
  thumbnailFile: File | null = null;
  videoUrl: string | null = null;
  thumbnailUrl: string | null = null;

  @Output() videoUploaded = new EventEmitter<LocalVideo>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.videoFile = input.files[0];
      this.videoUrl = URL.createObjectURL(this.videoFile);
    }
  }

  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.thumbnailFile = input.files[0];
      this.thumbnailUrl = URL.createObjectURL(this.thumbnailFile);
    }
  }

  isFormValid(): boolean {
    return !!this.title && !!this.videoFile;
  }

  onSubmit() {
    if (this.isFormValid() && this.videoFile) {
      const video: LocalVideo = {
        id: Date.now().toString(),
        title: this.title,
        description: this.description,
        file: this.videoFile,
        thumbnailUrl: this.thumbnailUrl || '',
        thumbnail: this.thumbnailUrl || '',
        filePath: `/assets/videos/${Date.now()}-${this.videoFile.name}`,
        videoUrl: this.videoUrl || ''
      };
      this.videoUploaded.emit(video);
      this.resetForm();
    }
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.videoFile = null;
    this.thumbnailFile = null;
    this.videoUrl = null;
    this.thumbnailUrl = null;
  }
}
