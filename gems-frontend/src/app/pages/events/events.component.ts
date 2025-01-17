// events.component.ts

import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service'; // Import EventsService

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events = [];
  categories = ['Music', 'Concert', 'Cinema']; // Update categories as per your backend
  carouselEvents = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.startAutoRotateCarousel();
  }

  fetchEvents() {
    this.eventsService.getEvents().subscribe((data) => {
      this.events = data;
      this.carouselEvents = [...this.events]; // Set carousel events
    });
  }

  getEventsByCategory(category: string) {
    return this.events.filter((event) => event.category === category);
  }

  scrollLeft(category: string) {
    const container = document.getElementById(category);
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(category: string) {
    const container = document.getElementById(category);
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  navigateToEvent(event: any) {
    console.log(`Navigating to event: ${event.eventName}`);
    // Add navigation logic here, e.g., this.router.navigate(['/event', event.id]);
  }

  startAutoRotateCarousel() {
    setInterval(() => {
      const firstEvent = this.carouselEvents.shift();
      if (firstEvent) {
        this.carouselEvents.push(firstEvent);
      }
    }, 3000); // Adjust interval as needed (3000ms = 3 seconds)
  }
}
