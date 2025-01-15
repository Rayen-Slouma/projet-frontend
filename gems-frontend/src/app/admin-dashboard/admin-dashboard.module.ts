import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component'; // Import UserListComponent
import { EventListComponent } from './event-list/event-list.component'; // Import EventListComponent

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserListComponent,   // Add UserListComponent here if you have created it
    EventListComponent,  // Add EventListComponent here if you have created it
  ],
  imports: [
    CommonModule
  ],
  exports: [AdminDashboardComponent]
})
export class AdminDashboardModule { }
