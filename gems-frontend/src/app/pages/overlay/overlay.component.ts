import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../services/search.service'; // Adjust the path as needed
import { Router } from '@angular/router';
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
  @Input() isOpen: boolean = false; // Input from parent to control overlay visibility
  @Output() closeOverlay: EventEmitter<void> = new EventEmitter<void>(); // Event to notify parent when overlay is closed

  searchQuery: string = ''; // Store search query
  searchResults: any[] = []; // Store search results

  constructor(private searchService: SearchService, private router: Router) {}

  get isSearchActive(): boolean {
    return this.isOpen; // Ensures the overlay visibility is controlled by isOpen
  }

  close() {
    this.closeOverlay.emit(); // Emit event to parent to close the overlay
  }

  navigateToEvent(eventId: string) {
    this.router.navigate(['/view-event', eventId]).then(() => {
      this.close(); // Close overlay after navigation
    });
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchService.searchEvents(this.searchQuery).subscribe((results) => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }
}
