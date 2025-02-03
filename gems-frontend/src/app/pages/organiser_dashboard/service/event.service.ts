import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000';
  private eventSubject = new Subject<any>();
  private editingEvent: any = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  emitEvent(event: any): void {
    this.eventSubject.next(event);
  }

  getEventObservable(): Observable<any> {
    return this.eventSubject.asObservable();
  }

  viewEventDetails(eventId: number): void {
    this.router.navigate([`/view-event/${eventId}`]);
  }

  setEditingEvent(event: any): void {
    this.editingEvent = event;
    this.router.navigate(['/organiser-dashboard/create-event'], { queryParams: { edit: true } });
  }

  getEditingEvent(): any {
    return this.editingEvent;
  }

  clearEditingEvent(): void {
    this.editingEvent = null;
  }

  getEvent(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${id}`).pipe(
      map(event => {
        // Ensure organizers is always an array
        if (!event['organizers']) {
          event['organizers'] = [];
        }
        return event;
      })
    );
  }

  updateEvent(id: number, eventData: any): Observable<any> {
    console.log('Updating event with ID:', id);
    console.log('Update data:', eventData);
    
    // Ensure organizers array exists
    if (!eventData.organizers) {
      eventData.organizers = [];
    }

    // Use PATCH for partial updates
    return this.http.patch(`${this.apiUrl}/events/${id}`, eventData);
  }

  deleteEvent(eventId: number): Observable<any> {
    console.log('Deleting event with ID:', eventId);
    return this.http.delete(`${this.apiUrl}/events/${eventId}`);
  }
}
