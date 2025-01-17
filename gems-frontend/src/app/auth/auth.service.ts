import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginDto } from './authDtos/login.dto';
import { RegisterDto } from './authDtos/register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) {}


  login(loginData: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      catchError(this.handleError) 
    );
  }

  register(registerData: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData).pipe(
      catchError(this.handleError) 
    );
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
