import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {}; // Données utilisateur
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      // Récupérer les données utilisateur
      this.http.get(`http://localhost:3000/users/public/${userId}`).subscribe(
        (data) => {
          this.user = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération des données utilisateur', error);
          this.errorMessage = 'Impossible de charger les données.';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'ID utilisateur manquant.';
      this.isLoading = false;
    }
  }

  // Méthode pour sauvegarder les modifications
  saveChanges() {
    const userId = this.user.id;
    this.http.put(`http://localhost:3000/users/update/${userId}`, this.user).subscribe(
      (response) => {
        alert('Profil mis à jour avec succès.');
        window.location.href = `/user-profile/${userId}`;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
        alert('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
      }
    );
  }
}
