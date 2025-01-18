import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EventEditComponent implements OnInit {
  event: any = {}; // Stocke les détails de l'événement à modifier
  private apiUrl = 'http://localhost:3000/events'; // URL API

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router // Déclarez le router comme public
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'événement depuis les paramètres de la route
    const eventId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEventDetails(eventId);
  }

  // Charger les détails de l'événement
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

  // Sauvegarder les modifications de l'événement
  saveEvent(): void {
    this.http.put(`${this.apiUrl}/${this.event.id}`, this.event).subscribe(
      () => {
        alert('Événement mis à jour avec succès !');
        this.router.navigate(['/events', this.event.id]); // Navigation via router
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'événement', error);
      }
    );
  }
}
