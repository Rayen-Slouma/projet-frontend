import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];  // Users array to hold fetched data

  constructor(private router: Router, private http: HttpClient) {}

  // Function to navigate to user detail page
  navigateToUser(userId: number) {
    this.router.navigate([`/user/${userId}`]);
  }

  // Fetch users from the API
  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (data) => {
        this.users = data;  // Assign the fetched data to the users array
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  ngOnInit() {
    this.fetchUsers();  // Fetch users when the component initializes
  }
}
