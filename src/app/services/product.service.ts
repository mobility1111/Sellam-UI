
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, ProductAd } from '../models/product.model';
import { environment } from '../environments/environment.prod';
import { ApiResponse } from '../interface/ApiResponse';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/api/products';

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  // Get product by id
  getProductById(id: string): Observable<Product> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  // Create product ad
  createProductAd(productAd: ProductAd): Observable<ProductAd> {
    return this.http.post<ApiResponse<ProductAd>>(`${this.apiUrl}/product-ad`, productAd)
      .pipe(
        map(response => response.data)
      );
  }

   // Get product ads with active filter
   getProductAds(isActive: boolean): Observable<ProductAd[]> {
    return this.http.get<ApiResponse<ProductAd[]>>(`${this.apiUrl}/product-ad?isActive=${isActive}`)
      .pipe(
        map(response => response.data)
      );
  }

  getProductAdById(adId: string): Observable<ProductAd> {
    return this.http.get<ApiResponse<ProductAd>>(`${this.apiUrl}/product-ad/${adId}`)
      .pipe(
        map(response => response.data)
      );
  }
    
   
   // Update product ad
  updateProductAd(productAd: ProductAd): Observable<ProductAd> {
    return this.http.put<ApiResponse<ProductAd>>(`${this.apiUrl}/product-ad`, productAd)
      .pipe(
        map(response => response.data)
      );
  }
  
  toggleProductAdStatus(adId: number): Observable<any> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/toggle-product-ad`, { id: adId }) // Use "id" instead of "adId"
      .pipe(map(response => response.data));
  }
  
}