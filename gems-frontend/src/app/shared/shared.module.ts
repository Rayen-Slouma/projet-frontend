import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from '../pages/organiser_dashboard/event-list/event-list.component';
import { ViewEventComponent } from '../components/view-event/view-event.component'; // Correct import path

@NgModule({
  declarations: [
    EventListComponent,
    ViewEventComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventListComponent,
    ViewEventComponent
  ]
})
export class SharedModule { }
