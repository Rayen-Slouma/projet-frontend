// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Pour les requêtes HTTP
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Tableau d'utilisateurs

  constructor(private router: Router, private http: HttpClient) {}

  // Fonction pour naviguer vers la page de détail de l'utilisateur
  navigateToUser(userId: number) {
    this.router.navigate([`/user/${userId}`]);
  }

  // Fonction pour supprimer un utilisateur
  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:3000/users/${userId}`).subscribe(
        (response) => {
          alert('User deleted successfully');
          this.users = this.users.filter(user => user.id !== userId); // Mise à jour de la liste après suppression
        },
        (error) => {
          console.error('Error deleting user', error);
          alert('Error deleting user');
        }
      );
    }
  }

  // Fonction pour afficher les détails d'un utilisateur
  viewUser(userId: number) {
    this.router.navigate([`/user/${userId}`]);
  }

  ngOnInit() {
    // Exemple d'appel API pour récupérer la liste des utilisateurs
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (data) => {
        this.users = data; // Mettre à jour la liste des utilisateurs
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}
