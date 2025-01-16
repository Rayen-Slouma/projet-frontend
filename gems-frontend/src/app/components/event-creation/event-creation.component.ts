import { Component } from '@angular/core';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent {
  event = {
    title: '',
    description: '',
    coverPhoto: '',
    startDate: '',
    endDate: '',
    location: '',
    category: '',
    price: 0,
    ticketLimit: 0,
    mode: 'online',
    organizers: [],
  };

  sectionColor = localStorage.getItem('sectionColor') || '#ffffff';
  textColor = localStorage.getItem('textColor') || '#000000';


  categories = ['Sports', 'Music', 'Education', 'Technology', 'Health'];
  users = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams'];
  selectedOrganizer: string;
  latitude = 37.7749;
  longitude = -122.4194;

  ngOnInit(): void {
    this.applySavedColors();
  }
  applySavedColors(): void {
    document.documentElement.style.setProperty('--section-color', this.sectionColor);
    document.documentElement.style.setProperty('--text-color', this.textColor);
  }

  updateColors(): void {
    // Update the CSS variables dynamically
    document.documentElement.style.setProperty('--section-color', this.sectionColor);
    document.documentElement.style.setProperty('--text-color', this.textColor);

    // Save the colors to localStorage for persistence
    localStorage.setItem('sectionColor', this.sectionColor);
    localStorage.setItem('textColor', this.textColor);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.event.coverPhoto = e.target.result);
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

  onMapClick(event: any): void {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  onSubmit(): void {
    console.log('Event Created:', this.event);
  }
}
