import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit {
  event: any = {};
  sectionColor = '#ffffff';
  textColor = '#000000';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.fetchEvent(eventId);
    }
  }

  fetchEvent(id: string): void {
    this.http.get(`http://localhost:3000/events/${id}`).subscribe({
      next: (data: any) => {
        this.event = data;
        this.sectionColor = this.event.sectionColor || '#ffffff';
        this.textColor = this.event.textColor || '#000000';
        this.applyDynamicStyles();
      },
      error: (err) => console.error('Error fetching event:', err),
    });
  }

  applyDynamicStyles(): void {
    document.documentElement.style.setProperty('--section-color', this.sectionColor);
    document.documentElement.style.setProperty('--text-color', this.textColor);
  }
}
