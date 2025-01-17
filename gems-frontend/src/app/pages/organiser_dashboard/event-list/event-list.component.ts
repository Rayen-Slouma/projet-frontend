import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events = [
    {
      eventName: 'Event 1',
      eventDescription: 'Description for Event 1',
      location: 'Location 1',
      startDate: new Date(),
      startTime: '10:00 AM',
      endDate: new Date(),
      endTime: '5:00 PM',
      numberOfPlaces: 100,
      prices: 50,
      category: 'Conference',
      hover: false,
      backgroundColor: '#ffffff'
    },
    {
      eventName: 'Event 2',
      eventDescription: 'Description for Event 2',
      location: 'Location 2',
      startDate: new Date(),
      startTime: '9:00 AM',
      endDate: new Date(),
      endTime: '4:00 PM',
      numberOfPlaces: 200,
      prices: 100,
      category: 'Workshop',
      hover: false,
      backgroundColor: '#ffffff'
    },
    // Add more events as needed
  ];

  showForm = false;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  editEvent(event) {
    // Logic to edit event
    console.log('Edit event:', event);
  }

  deleteEvent(event) {
    // Logic to delete event
    this.events = this.events.filter(e => e !== event);
    console.log('Delete event:', event);
  }

  addEvent() {
    // Logic to add a new event
    const newEvent = {
      eventName: 'New Event',
      eventDescription: 'Description for New Event',
      location: 'New Location',
      startDate: new Date(),
      startTime: '12:00 PM',
      endDate: new Date(),
      endTime: '6:00 PM',
      numberOfPlaces: 150,
      prices: 75,
      category: 'Meetup',
      hover: false,
      backgroundColor: '#ffffff'
    };
    this.events.push(newEvent);
    console.log('Add event:', newEvent);
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
