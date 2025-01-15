import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component'; // Assurez-vous que ce fichier existe
import { EventListComponent } from './event-list/event-list.component'; // Assurez-vous que ce fichier existe

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserListComponent,   // Ajouter ici si vous avez créé ce composant
    EventListComponent,  // Ajouter ici si vous avez créé ce composant
  ],
  imports: [
    CommonModule
  ],
  exports: [AdminDashboardComponent]
})
export class AdminDashboardModule { }
