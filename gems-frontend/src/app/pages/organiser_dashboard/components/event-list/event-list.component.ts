import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../service/event.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input() showAddEventButton = true;
  @Input() isAdmin = false;
  events: any[] = [];
  userEvents: any[] = [];

  constructor(
    private eventService: EventService,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get<any[]>('http://localhost:3000/events').subscribe({
      next: (events) => {
        const currentUser = this.authService.getUserInfoFromToken();
        if (this.isAdmin) {
          this.events = events;
        } else {
          // Filter events where the current user is an organizer
          this.events = events.filter(event => 
            event.organizers && event.organizers.includes(currentUser.sub)
          );
        }
      },
      error: (error) => console.error('Error loading events:', error)
    });
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          console.log('Event deleted successfully');
          this.events = this.events.filter(event => event.id !== eventId);
        },
        error: (error) => {
          console.error('Error deleting event:', error);
          alert('Failed to delete event. Please try again.');
        }
      });
    }
  }

  editEvent(event: any): void {
    this.eventService.setEditingEvent(event);
  }

  viewEventDetails(eventId: number): void {
    this.eventService.viewEventDetails(eventId);
  }
}
