import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: any = {}; // Stocke les détails de l'événement
  private apiUrl = 'http://localhost:3000/events'; // API pour les événements
  currentYear: number = new Date().getFullYear(); // Année actuelle pour le copyright

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'événement depuis les paramètres de la route
    const eventId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEventDetails(eventId);
  }

  // Charger les détails de l'événement depuis l'API
  loadEventDetails(eventId: number): void {
    this.http.get(`${this.apiUrl}/${eventId}`).subscribe(
      (data) => {
        this.event = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'événement', error);
      }
    );
  }

  // Fonction pour naviguer vers la page d'édition
  editEvent(): void {
    this.router.navigate(['/edit', this.event.id]);
  }
}
