import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // Add more users or fetch them dynamically via a service
  ];

  // Function to return the current year
  currentYear() {
    return new Date().getFullYear();
  }

  ngOnInit() {
    // Additional initialization if needed
  }
}
