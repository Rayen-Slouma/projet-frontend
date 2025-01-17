import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
  event = {
    name: '',
    description: '',
    coverPhoto: '',
    startDate: '',
    endDate: '',
    location: '',
    category: '',
    price: 0,
    ticketLimit: 0,
    mode: 'online',
    sectionColor: '#ff0000',
    textColor: '#ffffff',
    organizers: [],
  };

  categories: string[] = [];
  newCategory: string = '';
  selectedCategory: string = '';
  users = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams'];
  selectedOrganizer: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.applySavedColors();
    this.fetchCategories();

  }
  fetchCategories(): void {
    this.http.get<string[]>('http://localhost:3000/categories').subscribe({
      next: (data: any) => {
        this.categories = [...data.map((cat: any) => cat.name), 'Other'];
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  addCategory(): void {
    if (this.newCategory) {
      this.http.post('http://localhost:3000/categories', { name: this.newCategory }).subscribe({
        next: (response: any) => {
          this.categories.splice(this.categories.length - 1, 0, this.newCategory);
          this.event.category = this.newCategory; // Assign the new category to the event
          this.newCategory = '';
        },
        error: (err) => console.error('Error adding category:', err),
      });
    }
  }
  applySavedColors(): void {
    const savedSectionColor = localStorage.getItem('sectionColor');
    const savedTextColor = localStorage.getItem('textColor');

    this.event.sectionColor = savedSectionColor || this.event.sectionColor;
    this.event.textColor = savedTextColor || this.event.textColor;

    document.documentElement.style.setProperty('--section-color', this.event.sectionColor);
    document.documentElement.style.setProperty('--text-color', this.event.textColor);
  }

  updateColors(): void {
    // Update the CSS variables dynamically
    document.documentElement.style.setProperty('--section-color', this.event.sectionColor);
    document.documentElement.style.setProperty('--text-color', this.event.textColor);

    // Save the colors to localStorage for persistence
    localStorage.setItem('sectionColor', this.event.sectionColor);
    localStorage.setItem('textColor', this.event.textColor);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.event.coverPhoto = e.target.result; // Save the base64 image to the event object
      };
      reader.readAsDataURL(file);
    }
  }

  addOrganizer(): void {
    if (this.selectedOrganizer && !this.event.organizers.includes(this.selectedOrganizer)) {
      this.event.organizers.push(this.selectedOrganizer);
    }
    this.selectedOrganizer = '';
  }

  removeOrganizer(organizer: string): void {
    this.event.organizers = this.event.organizers.filter((org) => org !== organizer);
  }

  onSubmit(): void {
    const eventData = {
      ...this.event,
      startDate: new Date(this.event.startDate).toISOString(), // Ensure ISO date format
      endDate: new Date(this.event.endDate).toISOString(),     // Ensure ISO date format
    };

    this.http.post('http://localhost:3000/events', eventData).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
        alert('Event created successfully!');
      },
      error: (error) => {
        console.error('Error creating event:', error);
        alert('Failed to create event. Please try again.');
      },
    });
  }
}
