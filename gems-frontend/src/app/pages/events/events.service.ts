import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'http://localhost:3000/allevents'; // Update this URL based on your backend

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getEventsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${category}`);
  }
}
