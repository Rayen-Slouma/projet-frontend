import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit, OnChanges {
  @Input() id: string;
  event: any = {};
  sectionColor = '#ffffff';
  textColor = '#000000';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && changes['id'].currentValue) {
      this.fetchEvent(changes['id'].currentValue);
    }
  }

  ngOnInit(): void {
    console.log('ViewEventComponent Initialized'); // Debug Component Initialization
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('Route Event ID:', routeId); // Log the route parameter

    if (routeId) {
      this.fetchEvent(routeId);
    } else if (this.id) {
      this.fetchEvent(this.id);
    } else {
      console.warn('No Event ID found in route or input!');
    }
  }

  fetchEvent(id: string): void {
    console.log('Fetching Event with ID:', id); // Debug Fetch Start
    this.http.get(`http://localhost:3000/events/${id}`).subscribe({
      next: (data: any) => {
        console.log('Event Data Retrieved:', data); // Log Full Event Data
        this.event = data;

        console.log('Cover Photo Data:', this.event.eventPicture); // Log Cover Photo
        if (this.event.eventPicture && !this.event.eventPicture.startsWith('data:image')) {
          console.warn('Cover photo is missing the data:image prefix. Adding prefix...');
          this.event.eventPicture = `data:image/png;base64,${this.event.eventPicture}`;
        }
        this.event.eventPicture = this.sanitizeBase64(this.event.eventPicture);

        console.log('Cover Photo Data2:', this.event.eventPicture); // Log Cover Photo

        this.sectionColor = this.event.sectionColor || '#ffffff';
        this.textColor = this.event.textColor || '#000000';

        console.log('Section Color:', this.sectionColor); // Log Section Color
        console.log('Text Color:', this.textColor); // Log Text Color

        this.applyDynamicStyles();
      },
      error: (err) => console.error('Error fetching event:', err),
    });
  }
  sanitizeBase64(base64: string): string {
    return base64.trim().replace(/\s+/g, ''); // Remove unnecessary spaces and line breaks
  }
  applyDynamicStyles(): void {
    console.log('Applying Dynamic Styles'); // Debug Dynamic Style Application
    document.documentElement.style.setProperty('--section-color', this.sectionColor);
    document.documentElement.style.setProperty('--text-color', this.textColor);
  }
}
