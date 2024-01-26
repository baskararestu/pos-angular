import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginResponse } from '../../models/auth/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response) {
            this.isAuthenticated = true;
            // localStorage.setItem('user', JSON.stringify(response));
            console.log(response);
          }
        }),
        catchError((error) => {
          console.error(error);
          return of(null as unknown as LoginResponse); // Resolve TypeScript error
        })
      );
  }

  logout(): void {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      // Additional check for the presence of the user token
      this.isAuthenticated = false;
      localStorage.removeItem('user');
    }
  }

  isAuthenticated$(): Observable<boolean> {
    return of(this.isAuthenticated);
  }
}
