import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalVideo } from '../../services/local-video.service';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
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
