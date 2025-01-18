import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'http://localhost:3000/allevents';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }

  getEventsByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${categoryId}`);
  }
  
}
