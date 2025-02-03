import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError , tap} from 'rxjs';
import { LoginDto } from './authDtos/login.dto';
import { RegisterDto } from './authDtos/register.dto';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) {}

  login(loginData: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap((response: any) => {
        // Store access token under 'token'
        localStorage.setItem('token', response.access_token);
      }),
      catchError(this.handleError)
    );
  }
  
  logout() {
    localStorage.removeItem('token'); // Clear token on logout
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Returns true if token exists, false otherwise
  }

  register(registerData: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData).pipe(
      catchError(this.handleError) 
    );
  }

  getUserInfoFromToken(): any {
    const token = localStorage.getItem('token'); // <-- ensure consistent key
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        username: payload.username,
        role: payload.role,
        sub: payload.sub
      };
    } catch (err) {
      console.error('Error parsing token:', err);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
