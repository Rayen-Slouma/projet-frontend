import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Pour les requêtes HTTP

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // Pour stocker les données de l'utilisateur
  isLoading: boolean = true; // Pour afficher un indicateur de chargement
  errorMessage: string = ''; // Pour afficher les erreurs

  constructor(
    private route: ActivatedRoute, // Pour récupérer les paramètres de l'URL
    private http: HttpClient // Pour les requêtes HTTP
  ) {}

  ngOnInit() {
    // Récupérer l'ID de l'utilisateur à partir de l'URL
    const userId = this.route.snapshot.paramMap.get('id');
    
    if (userId) {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur
      this.http.get(`http://localhost:3000/api/users/${userId}`).subscribe(
        (data) => {
          this.user = data; // Stocker les données de l'utilisateur
          this.isLoading = false; // Désactiver le chargement une fois les données récupérées
        },
        (error) => {
          console.error('Erreur lors de la récupération des données utilisateur', error);
          this.isLoading = false; // Désactiver le chargement
          this.errorMessage = 'Impossible de récupérer les données utilisateur. Veuillez réessayer plus tard.';
        }
      );
    } else {
      this.isLoading = false;
      this.errorMessage = 'L\'ID utilisateur est manquant.';
    }
  }
}
