import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private apiUrl = 'http://localhost:3000/landingpage/upcoming-events';  // Make sure this URL is correct

  constructor(private http: HttpClient) {}

  // Define the return type of the method
  getUpcomingEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Return the Observable as an array
  }
}
