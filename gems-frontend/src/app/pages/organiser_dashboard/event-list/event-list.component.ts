import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../service/event.service';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input() showAddEventButton: boolean = true; // Add input property
  events: Event[] = [];
  private apiUrl = 'http://localhost:3000/events';

  constructor(
    private eventService: EventService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get<Event[]>(this.apiUrl).subscribe(
      (data) => {
        this.events = data.map(event => ({
          ...event,
          hover: false,
          backgroundColor: event.sectionColor || '#ffffff',
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate)
        }));
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  editEvent(event: any): void {
    this.eventService.setEditingEvent(event);
  }

  deleteEvent(event) {
    const confirmDelete = confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/${event.id}`).subscribe(
        () => {
          console.log(`Event with ID ${event.id} deleted.`);
          this.loadEvents(); // Reload the events list after deletion
        },
        (error) => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }

  addEvent(): void {
    this.router.navigate(['/organiser-dashboard/create-event']);
  }

  posterView(event) {
    this.eventService.emitEvent(event);
  }

  isAnyEventHovered() {
    return this.events.some(event => event.hover);
  }
}
