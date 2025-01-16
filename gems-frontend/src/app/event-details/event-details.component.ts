import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importez le Router pour la navigation

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: any = {}; // Objet pour stocker les détails de l'événement
  private apiUrl = 'http://localhost:3000/events'; // URL de l'API pour les événements
  currentYear: number = new Date().getFullYear(); // Année actuelle pour le copyright

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router // Injectez le Router dans le constructeur
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'événement depuis les paramètres de la route
    const eventId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEventDetails(eventId); // Charger les détails de l'événement
  }

  // Fonction pour récupérer les détails de l'événement depuis l'API
  loadEventDetails(eventId: number): void {
    this.http.get(`${this.apiUrl}/${eventId}`).subscribe(
      (data) => {
        this.event = data; // Mettre à jour les détails de l'événement
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'événement', error);
      }
    );
  }

  // Fonction pour gérer l'édition de l'événement
  editEvent(): void {
    console.log('Edit event clicked');
    // Redirige vers une route d'édition, ajustez cette route selon vos besoins
    this.router.navigate(['/edit', this.event.id]); 
  }
}
