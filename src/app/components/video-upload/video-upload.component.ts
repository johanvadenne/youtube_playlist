import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalVideo } from '../../services/local-video.service';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="upload-form">
      <div class="form-group">
        <label for="title">Titre</label>
        <input type="text" id="title" [(ngModel)]="title" required>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" [(ngModel)]="description"></textarea>
      </div>

      <div class="form-group">
        <label for="video">Vidéo</label>
        <input type="file" id="video" (change)="onVideoSelected($event)" accept="video/*" required>
        <div class="preview" *ngIf="videoUrl">
          <video [src]="videoUrl" controls></video>
        </div>
      </div>

      <div class="form-group">
        <label for="thumbnail">Miniature (optionnel)</label>
        <input type="file" id="thumbnail" (change)="onThumbnailSelected($event)" accept="image/*">
        <div class="preview" *ngIf="thumbnailUrl">
          <img [src]="thumbnailUrl" alt="Aperçu de la miniature">
        </div>
      </div>

      <button type="button" (click)="onSubmit()" [disabled]="!isValid()">Uploader</button>
    </div>
  `,
  styles: [`
    .upload-form {
      max-width: 600px;
      margin: 0 auto;
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
      max-width: 200px;
      max-height: 150px;
    }
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
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
export class VideoUploadComponent implements OnDestroy {
  @Output() videoUploaded = new EventEmitter<LocalVideo>();

  title = '';
  description = '';
  videoFile: File | null = null;
  thumbnailFile: File | null = null;
  videoUrl: string | null = null;
  thumbnailUrl: string | null = null;

  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.videoFile = input.files[0];
      if (this.videoUrl) {
        URL.revokeObjectURL(this.videoUrl);
      }
      this.videoUrl = URL.createObjectURL(this.videoFile);
    }
  }

  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.thumbnailFile = input.files[0];
      if (this.thumbnailUrl) {
        URL.revokeObjectURL(this.thumbnailUrl);
      }
      this.thumbnailUrl = URL.createObjectURL(this.thumbnailFile);
    }
  }

  isValid(): boolean {
    return !!this.title && !!this.videoFile;
  }

  onSubmit() {
    if (!this.isValid()) return;

    const video: LocalVideo = {
      id: crypto.randomUUID(),
      title: this.title,
      description: this.description,
      file: this.videoFile!,
      thumbnail: this.thumbnailFile || undefined,
      videoUrl: this.videoUrl || '',
      thumbnailUrl: this.thumbnailUrl || undefined
    };

    this.videoUploaded.emit(video);
    this.resetForm();
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.videoFile = null;
    this.thumbnailFile = null;
    if (this.videoUrl) {
      URL.revokeObjectURL(this.videoUrl);
    }
    if (this.thumbnailUrl) {
      URL.revokeObjectURL(this.thumbnailUrl);
    }
    this.videoUrl = null;
    this.thumbnailUrl = null;
  }

  ngOnDestroy() {
    this.resetForm();
  }
}
