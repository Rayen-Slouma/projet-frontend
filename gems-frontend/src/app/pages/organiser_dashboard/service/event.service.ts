import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventSubject = new Subject<any>();

  constructor() { }

  emitEvent(event: any) {
    this.eventSubject.next(event);
  }

  getEventObservable(): Observable<any> {
    return this.eventSubject.asObservable();
  }
}
