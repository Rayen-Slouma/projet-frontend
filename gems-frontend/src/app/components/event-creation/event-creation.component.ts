import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../pages/organiser_dashboard/service/event.service';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JWT helper service

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
  event = {
    name: '',
    description: '',
    eventPicture: '', // Holds the file path from the backend
    startDate: '',
    endDate: '',
    location: '',
    category: '',
    price: 0,
    ticketLimit: 0,
    mode: 'online',
    sectionColor: '#ff0000',
    textColor: '#ffffff',
    organizer: null, // Single organizer ID
  };

  categories: string[] = [];
  newCategory: string = '';
  selectedCategory: string = '';
  isEditMode = false;
  editingEventId: number | null = null;
  selectedFile: File | null = null; // Holds the file object for upload
  filePreviewUrl: string | ArrayBuffer | null = null; // Holds the file preview URL

  private jwtHelper = new JwtHelperService(); // JWT helper instance

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.applySavedColors();
    this.fetchCategories();

    const token = localStorage.getItem('access_token');
    console.log('This is the token:', token);

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.event.organizer = decodedToken?.sub; // Set the organizer ID
    } else {
      console.error('Authorization token is missing.');
    }

    this.route.queryParams.subscribe((params) => {
      if (params['edit']) {
        const editingEvent = this.eventService.getEditingEvent();
        if (editingEvent) {
          this.isEditMode = true;
          this.editingEventId = editingEvent.id;
          this.populateForm(editingEvent);
        }
      }
    });
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
          this.event.category = this.newCategory;
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
    document.documentElement.style.setProperty('--section-color', this.event.sectionColor);
    document.documentElement.style.setProperty('--text-color', this.event.textColor);

    localStorage.setItem('sectionColor', this.event.sectionColor);
    localStorage.setItem('textColor', this.event.textColor);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Save the file for submission

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreviewUrl = e.target.result; // Create a preview for the HTML
      };
      reader.readAsDataURL(file);

      console.log('Selected file:', file);
    }
  }

  private populateForm(event: any): void {
    console.log('Populating form with event:', event);
    this.editingEventId = event.id;
    this.event = {
      ...event,
      category: event.category?.name || '',
      startDate: new Date(event.startDate).toISOString().slice(0, 16),
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      organizer: event.organizer?.id || null,
    };
  }

  onSubmit(): void {
    const eventData = {
      ...this.event,
      startDate: new Date(this.event.startDate).toISOString(),
      endDate: new Date(this.event.endDate).toISOString(),
    };

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:3000/upload', formData).subscribe({
        next: (response: any) => {
          console.log('File uploaded successfully:', response);
          eventData.eventPicture = response.filePath; // Use the file path from the backend
          this.createOrUpdateEvent(eventData);
        },
        error: (err) => {
          console.error('Error uploading file:', err);
          alert('File upload failed. Please try again.');
        },
      });
    } else {
      this.createOrUpdateEvent(eventData);
    }
  }

  private createOrUpdateEvent(eventData: any): void {
    console.log('Submitting form in', this.isEditMode ? 'edit' : 'create', 'mode');
    console.log('Event Data:', eventData);

    if (this.isEditMode && this.editingEventId) {
      this.eventService.updateEvent(this.editingEventId, eventData).subscribe({
        next: (response) => {
          console.log('Event updated successfully:', response);
          this.eventService.clearEditingEvent();
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error updating event:', error);
          alert('Failed to update event. Please try again.');
        },
      });
    } else {
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
}
