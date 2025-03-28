import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Banner } from 'src/app/models/banner.model';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  banners: Banner[] = [];
  selectedFiles: File[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
    this.loadBanners();
  }

  loadBanners() {
    this.isLoading = true;
    this.errorMessage = null;

    this.bannerService.getBanners().subscribe({
      next: (banners) => {
        console.log('Loaded banners:', banners);
        this.banners = banners;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to load banners. Please try again.';
        this.isLoading = false;
        console.error('Error loading banners', error);
      }
    });
  }

  // Method to handle image load errors
  handleImageError(event: any) {
    event.target.style.display = 'none';
    console.warn('Failed to load image:', event.target.src);
  }

  onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);

    // Reset previous selections and errors
    this.selectedFiles = [];
    this.errorMessage = null;

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        this.errorMessage = `Invalid file type for ${file.name}. Only JPEG, PNG, GIF, and WebP are allowed.`;
        return false;
      }

      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.errorMessage = `${file.name} is too large. Maximum file size is 5MB.`;
        return false;
      }

      return true;
    });

    // Store valid files
    this.selectedFiles = validFiles;
  }

  uploadSelectedFiles() {
    if (this.selectedFiles.length === 0) {
      this.errorMessage = 'Please select at least one image to upload.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.bannerService.uploadBanners(this.selectedFiles).subscribe({
      next: (uploadedBanners) => {
        this.banners = [...this.banners, ...uploadedBanners];
        this.selectedFiles = []; // Clear selected files
        this.fileInput.nativeElement.value = ''; // Reset file input
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to upload banners. Please try again.';
        this.isLoading = false;
        console.error('Error uploading banners', error);
      }
    });
  }

  deleteBanner(publicId: string) {
    this.isLoading = true;
    this.errorMessage = null;

    this.bannerService.deleteBanner(publicId).subscribe({
      next: () => {
        this.banners = this.banners.filter(banner => banner.publicId !== publicId);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to delete banner. Please try again.';
        this.isLoading = false;
        console.error('Error deleting banner', error);
      }
    });
  }

  // Helper method to show selected file names
  getSelectedFileNames(): string {
    return this.selectedFiles.map(file => file.name).join(', ');
  }
}