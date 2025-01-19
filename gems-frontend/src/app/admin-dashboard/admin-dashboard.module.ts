import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminEventListComponent } from './admin-event-list/admin-event-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'; // Correct import path

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminEventListComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule // Import SharedModule
  ],
  exports: [AdminDashboardComponent]
})
export class AdminDashboardModule { }
