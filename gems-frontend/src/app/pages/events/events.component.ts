import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events = [];
  categories = [];
  carouselEvents = [];
  categoryEvents: { [key: number]: any[] } = {}; // Store events by category

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchEvents();
  }

  fetchCategories() {
    this.eventsService.getCategories().subscribe((data) => {
      this.categories = data; // Set categories dynamically
      this.categories.forEach((category) => this.fetchEventsByCategory(category.id));
    });
  }

  fetchEvents() {
    this.eventsService.getEvents().subscribe((data) => {
      this.events = data;
      this.carouselEvents = [...this.events]; // Set carousel events
    });
  }

  fetchEventsByCategory(categoryId: number) {
    this.eventsService.getEventsByCategory(categoryId).subscribe((data) => {
      this.categoryEvents[categoryId] = data; // Store events for the category
    });
  }

  scrollLeft(categoryId: number) {
    const container = document.getElementById(`category-${categoryId}`);
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(categoryId: number) {
    const container = document.getElementById(`category-${categoryId}`);
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}
