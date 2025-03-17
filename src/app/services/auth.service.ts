// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string | null;
  userData: any | null;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dasie1-001-site1.otempurl.com/api/auth';
  
  constructor(private http: HttpClient) { }
  
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            if (response.userData) {
              localStorage.setItem('userData', JSON.stringify(response.userData));
            }
          }
        })
      );
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }
}