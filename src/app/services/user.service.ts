import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { ApiResponse } from '../interface/ApiResponse';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`; 
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

    getUserById(userId: string): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/login-user`, {
      params: { userId }
    }).pipe(
      map(response => response.data)
    );
  }
  
  disableUser(userId: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/disable`, { 
      userId: userId 
    });
  }

  deleteUser(userId: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/delete`, { 
      userId: userId 
    });
  }
}