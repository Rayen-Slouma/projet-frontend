import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';
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

  updateEvent(eventId: number, eventData: any): Observable<any> {
    console.log('Updating event with ID:', eventId);
    console.log('Update data:', eventData);
    return this.http.patch(`${this.apiUrl}/${eventId}`, eventData);
  }
}
