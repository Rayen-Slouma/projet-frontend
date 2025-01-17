import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  private apiUrl = 'http://localhost:3000/events';

  constructor(
    private eventService: EventService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.events = data.map(event => ({
          ...event,
          hover: false,
          backgroundColor: '#ffffff'
        }));
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  editEvent(event) {
    // Logic to edit event
    console.log('Edit event:', event);
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

  addEvent() {
    const newEvent = {
      name: 'New Event',
      description: 'Description for New Event',
      location: 'New Location',
      startDate: new Date().toISOString().split('T')[0],
      startTime: '12:00',
      endDate: new Date().toISOString().split('T')[0],
      endTime: '18:00',
      numberOfPlacesAvailable: 150,
      price: 75,
      category: 'Meetup',
    };

    this.http.post(this.apiUrl, newEvent).subscribe(
      (response) => {
        console.log('Event added:', response);
        this.loadEvents(); // Reload the events list after adding
      },
      (error) => {
        console.error('Error adding event:', error);
      }
    );
  }

  posterView(event) {
    this.eventService.emitEvent(event);
  }

  isAnyEventHovered() {
    return this.events.some(event => event.hover);
  }

  changeBackgroundColor(event, colorEvent) {
    event.backgroundColor = colorEvent.target.value;
  }
}
