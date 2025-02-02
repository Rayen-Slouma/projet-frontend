import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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
        localStorage.setItem('token', response.token); // Save token
      }),
      catchError(this.handleError)
    );
  }
  
  logout() {
    localStorage.removeItem('token'); // Clear token on logout
  }
  

  register(registerData: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData).pipe(
      catchError(this.handleError) 
    );
  }

  getUserInfoFromToken(): any {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Log the token
    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Log the decoded token
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
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
