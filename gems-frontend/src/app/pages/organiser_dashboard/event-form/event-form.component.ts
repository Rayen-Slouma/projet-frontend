import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  constructor() { }
  date: {year: number, month: number};
  model: NgbDateStruct;
  eventName: string;
  eventDescription: string;
  startDate: NgbDateStruct;
  startTime: string;
  endDate: NgbDateStruct;
  endTime: string;
  location: string;
  numberOfPlaces: number;
  eventPictures: File[];
  prices: number;
  categories = ['Conference', 'Workshop', 'Meetup', 'Webinar'];
  selectedCategory: string;
  otherCategory: string;
  progressValue: number = 0;

  ngOnInit(): void {
    this.updateProgress();
  }

  updateProgress() {
    let filledFields = 0;
    if (this.eventName) filledFields++;
    if (this.eventDescription) filledFields++;
    if (this.startDate) filledFields++;
    if (this.startTime) filledFields++;
    if (this.endDate) filledFields++;
    if (this.endTime) filledFields++;
    if (this.location) filledFields++;
    if (this.numberOfPlaces) filledFields++;
    if (this.prices) filledFields++;
    if (this.selectedCategory) filledFields++;
    if (this.selectedCategory === 'Other' && this.otherCategory) filledFields++;
    this.progressValue = (filledFields / 10) * 100;
  }

  updateLocation() {
    this.updateProgress();
  }

  onFileChange(event) {
    this.eventPictures = event.target.files;
    const input = event.target as HTMLInputElement;
    const label = input.nextElementSibling as HTMLLabelElement;
    if (input.files.length > 0) {
      label.innerText = `${input.files.length} file(s) selected`;
    } else {
      label.innerText = 'Choose files';
    }
    this.updateProgress();
  }

  createEvent() {
    // Logic to create event
    const category = this.selectedCategory === 'Other' ? this.otherCategory : this.selectedCategory;
    console.log('Selected Category:', category);
  }

  previewEvent() {
    // Logic to preview event
    const category = this.selectedCategory === 'Other' ? this.otherCategory : this.selectedCategory;
    console.log('Preview Event:', {
      eventName: this.eventName,
      eventDescription: this.eventDescription,
      startDate: this.startDate,
      startTime: this.startTime,
      endDate: this.endDate,
      endTime: this.endTime,
      location: this.location,
      numberOfPlaces: this.numberOfPlaces,
      eventPictures: this.eventPictures,
      prices: this.prices,
      category: category
    });
  }

}
