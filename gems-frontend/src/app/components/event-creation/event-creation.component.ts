import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../pages/organiser_dashboard/service/event.service';
import { AuthService } from '../../auth/auth.service'; // Import AuthService

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
  event = {
    name: '',
    description: '',
    eventPicture: '',
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
  users: any[] = [];
  selectedOrganizer: string;
  isEditMode = false;
  editingEventId: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    this.applySavedColors();
    this.fetchCategories();
    this.fetchUsers();

    this.route.queryParams.subscribe(params => {
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

  fetchUsers(): void {
    const currentUser = this.authService.getUserInfoFromToken();
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (data: any) => {
        this.users = data.filter(user => user.username !== 'admin' && user.id !== currentUser.sub);
      },
      error: (err) => console.error('Error fetching users:', err),
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
        this.event.eventPicture = e.target.result; // Save the base64 image to the event object
        console.log('Base64 Image:', this.event.eventPicture); // Log the base64 image to the console
      };
      reader.readAsDataURL(file);
    }
  }

  addOrganizer(): void {
    const selectedUser = this.users.find(user => user.username === this.selectedOrganizer);
    if (selectedUser && !this.event.organizers.includes(selectedUser.id)) {
      this.event.organizers.push(selectedUser.id);
    }
    this.selectedOrganizer = '';
  }

  removeOrganizer(organizerId: string): void {
    this.event.organizers = this.event.organizers.filter((id) => id !== organizerId);
  }

  getUsernameById(userId: string): string {
    const user = this.users.find(user => user.id === userId);
    return user ? user.username : '';
  }

  private populateForm(event: any): void {
    console.log('Populating form with event:', event);
    this.editingEventId = event.id;  // Ensure the ID is set
    this.event = {
      ...event,
      category: event.category?.name || '',  // Handle nested category object
      startDate: new Date(event.startDate).toISOString().slice(0, 16),
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      organizers: event.organizers || []
    };
  }

  onSubmit(): void {
    const userInfo = this.authService.getUserInfoFromToken();
    if (userInfo && userInfo.sub) {
      this.event.organizers.push(userInfo.sub); // Add the user ID to the organizers list
    }

    const eventData = {
      ...this.event,
      startDate: new Date(this.event.startDate).toISOString(),
      endDate: new Date(this.event.endDate).toISOString(),
    };

    console.log('Submitting form in', this.isEditMode ? 'edit' : 'create', 'mode');
    console.log('Event ID:', this.editingEventId);
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
        }
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
