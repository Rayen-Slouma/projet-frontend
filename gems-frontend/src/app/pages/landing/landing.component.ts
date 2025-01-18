import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingService } from '../../services/landing.service';  // Import the service

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  upcomingEvents: any[] = [];  // Variable to hold the upcoming events
  errorMessage: string = '';  // Variable to hold any error message

  constructor(private landingService: LandingService) { }

  ngOnInit() {
    // Fetch upcoming events and update the array
    this.landingService.getUpcomingEvents().subscribe(
      (data: any[]) => {
        this.upcomingEvents = data;  // Assign the fetched events to the upcomingEvents array
      },
      (error) => {
        console.error('Error fetching upcoming events', error);
        this.errorMessage = 'There was an error fetching the upcoming events. Please try again later.';  // Set error message
      }
    );
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
