import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // For HTTP requests
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Array to hold the list of users

  constructor(private router: Router, private http: HttpClient) {}

  // Function to navigate to the user profile page
  navigateToUser(userId: number) {
    this.router.navigate([`/user/${userId}`]);
  }

  // Function to delete a user
  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:3000/users/${userId}`).subscribe(
        (response) => {
          alert('User deleted successfully');
          this.users = this.users.filter(user => user.id !== userId); // Update the user list after deletion
        },
        (error) => {
          console.error('Error deleting user', error);
          alert('Error deleting user');
        }
      );
    }
  }

  // Function to view a user's details
  viewUser(userId: number) {
    this.router.navigate([`/user/${userId}`]);
  }

  ngOnInit() {
    // Example API call to fetch the list of users
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (data) => {
        this.users = data; // Update the user list with the fetched data
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}
