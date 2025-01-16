import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // Pour stocker les données de l'utilisateur
  isLoading: boolean = true; // Indicateur de chargement
  errorMessage: string = ''; // Message d'erreur

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Récupérer l'ID utilisateur à partir des paramètres de l'URL
    const userId = this.route.snapshot.paramMap.get('id');
    
    if (userId) {
      // Requête HTTP pour récupérer les détails utilisateur
      this.http.get(`http://localhost:3000/users/public/${userId}`).subscribe(
        (data) => {
          this.user = data; // Stocker les données utilisateur
          this.isLoading = false; // Désactiver l'indicateur de chargement
        },
        (error) => {
          console.error('Erreur lors de la récupération des données utilisateur', error);
          this.isLoading = false; // Désactiver l'indicateur de chargement
          this.errorMessage = 'Impossible de récupérer les données utilisateur. Veuillez réessayer plus tard.';
        }
      );
    } else {
      this.isLoading = false;
      this.errorMessage = 'L\'ID utilisateur est manquant.';
    }
  }

  // Gestion de l'erreur de chargement de l'image
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/ryan.jpg'; // Image par défaut en cas d'erreur
  }
}
