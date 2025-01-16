import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // Charger les événements depuis l'API
  loadEvents(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }

  // Fonction pour afficher les détails d'un événement
  viewEvent(eventId: number): void {
    this.router.navigate([`/event/${eventId}`]); // Naviguer vers la page de détails de l'événement
  }

  // Fonction pour supprimer un événement
  deleteEvent(eventId: number): void {
    const confirmDelete = confirm('Voulez-vous vraiment supprimer cet événement ?');
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/${eventId}`).subscribe(
        () => {
          console.log(`Événement avec l'ID ${eventId} supprimé.`);
          this.loadEvents(); // Recharger la liste des événements après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l’événement:', error);
        }
      );
    }
  }
}
