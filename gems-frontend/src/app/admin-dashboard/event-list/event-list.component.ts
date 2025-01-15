import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events = [
    { id: 1, title: 'Annual Tech Conference', location: 'New York' },
    { id: 2, title: 'Design Workshop', location: 'San Francisco' },
    { id: 3, title: 'Startup Pitch Night', location: 'Los Angeles' },
    // Ajoutez d'autres événements ou récupérez-les dynamiquement via un service
  ];

  constructor() {}

  // Fonction pour naviguer vers la page de détail d'un événement
  navigateToEvent(eventId: number) {
    console.log(`Navigating to event with ID: ${eventId}`);
    // Vous pouvez implémenter une navigation ici si nécessaire
  }

  // Fonction pour retourner l'année actuelle
  currentYear() {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    // Code d'initialisation si nécessaire
  }
}
