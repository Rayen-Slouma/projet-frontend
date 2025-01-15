import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [
    { id: 1, name: 'John Doe', job: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', job: 'Designer' },
    // Add more users or fetch them dynamically via a service
  ];

  constructor(private router: Router) {}

  // Function to navigate to user detail page
  navigateToUser(userId: number) {
    this.router.navigate([`/user/${userId}`]);
  }

  // Function to return the current year
  currentYear() {
    return new Date().getFullYear();
  }

  ngOnInit() {
    // Additional initialization if needed
  }
}
