import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../models/company.model';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/api/company`;

  constructor(private http: HttpClient) { }

  getAllCompanies(isVerified?: boolean): Observable<{ data: Company[], success: boolean, message: string, errors: any[] }> {
    let params = new HttpParams();
    if (isVerified !== undefined) {
      params = params.set('IsVerified', isVerified.toString());
    }
  
    return this.http.get<{ data: Company[], success: boolean, message: string, errors: any[] }>(
      this.apiUrl,
      { params }
    );
  }
  
  getCompanyByUserId(userId: string): Observable<{ data: Company, success: boolean, message: string, errors: any[] }> {
    return this.http.get<{ data: Company, success: boolean, message: string, errors: any[] }>(
      `${this.apiUrl}/${userId}`
    ).pipe(
      catchError(error => {
        console.error('Error fetching company:', error);
        
        if (error.error && typeof error.error === 'object') {
          return throwError(() => error.error);
        }
        
        return throwError(() => ({
          data: null as any,
          success: false,
          message: 'Failed to load company details',
          errors: [error.message || 'Unknown error']
        }));
      })
    );
  }
}
