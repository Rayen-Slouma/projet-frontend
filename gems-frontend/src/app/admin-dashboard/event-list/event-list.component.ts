import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: any[] = []; // Liste des événements initialisée comme vide
  private apiUrl = 'http://localhost:3000/events'; // URL de l'API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Appel à l'API pour récupérer les événements
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.events = data; // Assigner les données récupérées
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }
}
