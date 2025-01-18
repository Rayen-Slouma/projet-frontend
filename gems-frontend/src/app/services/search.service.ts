// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = 'http://localhost:3000/search'; // Adjust with your backend URL

  constructor(private http: HttpClient) {}

  searchEvents(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get(`${this.baseUrl}/events`, { params });
  }
}
