import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminMediaService } from '../../shared/services/admin-media.service';
import { GalleryImage } from '../../shared/models';

@Component({
  selector: 'app-gallery-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery-admin.component.html',
  styleUrls: ['./gallery-admin.component.scss']
})
export class GalleryAdminComponent implements OnInit {
  images: GalleryImage[] = [];
  selectedImages: Set<number> = new Set();
  loading = false;
  uploadProgress = false;
  viewMode: 'grid' | 'list' = 'grid';
  showImageInfo = false;

  constructor(private mediaService: AdminMediaService) {}

  ngOnInit() {
    this.loadImages();
  }

  loadImages(): void {
    this.loading = true;
    this.mediaService.getImages().subscribe({
      next: (res) => {
        this.images = res.content || res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length === 0) return;
    this.uploadProgress = true;
    const fileArray = Array.from(files);

    this.mediaService.uploadMultiple(fileArray).subscribe({
      next: (newImages) => {
        this.images = [...newImages, ...this.images];
        this.uploadProgress = false;
      },
      error: () => this.uploadProgress = false
    });
  }

  toggleSelection(id: number): void {
    if (this.selectedImages.has(id)) {
      this.selectedImages.delete(id);
    } else {
      this.selectedImages.add(id);
    }
  }

  selectAll(): void {
    if (this.selectedImages.size === this.images.length) {
      this.selectedImages.clear();
    } else {
      this.images.forEach(img => this.selectedImages.add(img.id));
    }
  }

  deleteSelected(): void {
    if (this.selectedImages.size === 0) return;
    if (!confirm(`¿Eliminar ${this.selectedImages.size} imagen(es)?`)) return;
    const ids = Array.from(this.selectedImages);
    // TODO: Batch delete
    ids.forEach(id => {
      this.mediaService.deleteImage(id).subscribe(() => {
        this.images = this.images.filter(img => img.id !== id);
      });
    });
    this.selectedImages.clear();
  }

  deleteImage(id: number): void {
    if (confirm('¿Eliminar esta imagen?')) {
      this.mediaService.deleteImage(id).subscribe(() => {
        this.images = this.images.filter(img => img.id !== id);
      });
    }
  }

  copyUrl(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      // Could add a toast notification
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}
