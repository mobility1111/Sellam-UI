import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';
import { Banner } from '../models/banner.model';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = `${environment.apiUrl}/api/dashboard/banner`;

  constructor(private http: HttpClient) {}

  // Get all banners
  getBanners(): Observable<Banner[]> {
    return this.http.get<ApiResponse<string[]>>(this.apiUrl).pipe(
      map(response => {
        console.log('Banner response:', response); // Debug log
        if (response.success) {
          return response.data.map(url => ({
            url: url,
            publicId: this.extractPublicIdFromUrl(url),
            fileName: this.extractFileNameFromUrl(url)
          }));
        }
        return [];
      })
    );
  }

  // Upload banners
  uploadBanners(files: File[]): Observable<Banner[]> {
    console.log('Uploading files:', files);

    if (!files || files.length === 0) {
      console.error('No files to upload');
      throw new Error('No files selected');
    }

    const formData = new FormData();
    files.forEach(file => {
      console.log('Appending file:', file.name);
      formData.append('Banners', file, file.name);
    });

    return this.http.post<ApiResponse<string[]>>(this.apiUrl, formData).pipe(
      map(response => {
        if (response.success) {
          return response.data.map(url => ({
            url: url,
            publicId: this.extractPublicIdFromUrl(url),
            fileName: this.extractFileNameFromUrl(url)
          }));
        }
        throw new Error(response.message || 'Upload failed');
      })
    );
  }

  // Delete a banner
  deleteBanner(publicId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${publicId}`);
  }

  // Helper method to extract publicId from Cloudinary URL
  private extractPublicIdFromUrl(url: string): string {
    const match = url.match(/\/v\d+\/([^\.]+)/);
    return match ? match[1] : '';
  }

  // Helper method to extract filename from URL
  private extractFileNameFromUrl(url: string): string {
    const match = url.match(/\/([^\/]+)\.[^\.]+$/);
    return match ? match[1] : '';
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment.prod';
// import { Banner } from '../models/banner.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class BannerService {
//   private apiUrl = `${environment.apiUrl}/api/dashboard/banner`;

//   constructor(private http: HttpClient) {}

//   // Upload multiple banners
//   uploadBanners(files: File[]): Observable<Banner[]> {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('banners', file, file.name);
//     });

//     return this.http.post<Banner[]>(this.apiUrl, formData);
//   }

//   // Delete a banner by its public ID
//   deleteBanner(publicId: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${publicId}`);
//   }

//   // Get list of banners
//   getBanners(): Observable<Banner[]> {
//     return this.http.get<Banner[]>(this.apiUrl);
//   }
// }