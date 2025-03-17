// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Category } from '../models/category';
import { ApiResponse } from '../interface/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/api/categories`;


  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/${id}`);
  }

  addCategory(data: FormData | any): Observable<any> {
    // If data is already FormData, use it directly
    if (data instanceof FormData) {
      return this.http.post<any>(this.apiUrl, data);
    } 
    // Otherwise, create FormData from the object
    else {
      const formData = new FormData();
      formData.append('Name', data.name);
      formData.append('Description', data.description);
      if (data.image) {
        formData.append('Image', data.image);
      }
      return this.http.post<any>(this.apiUrl, formData);
    }
  }
  updateCategory(category: any): Observable<any> {
    const url = `${environment.apiUrl}/api/categories`;
    
    const formData = new FormData();
    formData.append('Id', category.id);
    formData.append('Name', category.name);
    formData.append('Description', category.description);
    if (category.image) {
      formData.append('Image', category.image);
    }
  
    return this.http.put(url, formData);
  }
}